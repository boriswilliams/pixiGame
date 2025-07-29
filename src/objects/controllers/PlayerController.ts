import { Application, Container, Ticker } from "pixi.js";

import { Controller } from "./Controller";
import { Pointer } from "../../entities/pointer";
import { Person } from "../../entities/person/Person";
import { angleCoords, coordsAngle, minMax, vectorAdd, vectorScale } from "../../utils/math";
import { Tickers } from "../Tickers";
import { Coords } from "../../utils/types";
import { RELATIVE_PLAYER_POSITION } from "../../values";

const MOVEMENT_SPEED = 3;
const RELATIVE_TIME = 400;
const SCOPE_TIME = 400;

export class PlayerController extends Controller {
  camera: Container;
  world: Container;
  tickers: Tickers;
  pointer: Pointer;

  person: Person | undefined;

  pointerLocked = false;

  relative = false;
  relativeness = 0;
  scoped = false;
  scopedness = 0;
  keys: {[key: string]: boolean} = {};
  target = { x: 0, y: 0 }

  constructor(app: Application, camera: Container, world: Container, tickers: Tickers, pointer: Pointer) {
    super(app);
    
    this.camera = camera;
    this.world = world;
    this.tickers = tickers;
    this.pointer = pointer;
  }

  move(a: Coords) {
    vectorAdd(this.person!.sprite, a);
    vectorAdd(this.target, a);
  }

  transform(a: Coords) {
    vectorAdd(a, this.camera);
    return this.camera.toLocal(a);
  }

  keydown = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      this.relative = !this.relative;
    } else {
      this.keys[e.key] = true;
    }
  }

  keyup = (e: KeyboardEvent) => {
    delete this.keys[e.key];
  }
  
  mousedown = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        this.isShooting = true;
        break;
      case 2:
        this.scoped = true;
        this.relative = true;
        break;
    }
  }

  mouseup = (e: MouseEvent) => {
    switch (e.button) {
      case 0:
        this.isShooting = false;
        break;
      case 2:
        this.scoped = false;
        this.relative = false;
        break;
    }
  }

  mousemove = (e: MouseEvent) => {
    const a = this.transform({x: e.movementX, y: e.movementY});
    vectorAdd(this.target, a);
  }

  private transition(frameTime: number, state: boolean, durationMs: number, value: number) {
    return minMax(0, value + (state ? 1 : -1) * frameTime/durationMs, 1);
  }

  ticker = (time: Ticker) => {
    // Transition moving values
    this.relativeness = this.transition(time.elapsedMS, this.relative, RELATIVE_TIME, this.relativeness);
    this.scopedness = this.transition(time.elapsedMS, this.scoped, SCOPE_TIME, this.scopedness);
    
    // Shoot
    if (this.isShooting) {
      this.person!.shoot(this.target);
    }

    // Rotate Player
    this.person!.sprite.rotation = coordsAngle(this.target, this.person!.sprite);

    // Rotate camera
    this.camera.rotation = -this.person!.sprite.rotation * this.relativeness;

    // Move
    const travel = time.elapsedMS / 17 * MOVEMENT_SPEED;
    const dir = { x: 0, y: 0 };
    if (this.keys.w)
      dir.y -= 1;
    if (this.keys.s)
      dir.y += 1;
    if (this.keys.a)
      dir.x -= 1;
    if (this.keys.d)
      dir.x += 1;
    if (dir.x !== 0 || dir.y !== 0) {
      const a = this.transform(angleCoords(coordsAngle(dir, {x: 0, y: 0})));
      vectorScale(a, travel);
      this.move(a);
    }

    // Translate camera
    const lowerPlayer = this.transform({
      x: 0,
      y: this.app.screen.height * (1/2 - RELATIVE_PLAYER_POSITION)
    });
    this.world.x = (-this.target.x * this.scopedness) + ((-this.person!.sprite.x + lowerPlayer.x * Math.max(0, this.relativeness - this.scopedness)) * (1 - this.scopedness));
    this.world.y = (-this.target.y * this.scopedness) + ((-this.person!.sprite.y + lowerPlayer.y * Math.max(0, this.relativeness - this.scopedness)) * (1 - this.scopedness));

    // Set crosshair location
    const crosshair = this.world.toGlobal(this.target);
    this.pointer.sprite.position.set(crosshair.x, crosshair.y);
  }

  click = (e: MouseEvent) => {
    if (!this.pointerLocked) {
      this.target = this.world.toLocal({
        x: e.clientX,
        y: e.clientY
      });;
      this.app.canvas.requestPointerLock();
    }
  }

  pointerlockchange = () => {
    if (document.pointerLockElement) {
      if (!this.pointerLocked) {
        this.pointerLocked = true;

        this.app.stage.addChild(this.pointer.sprite);

        document.onkeydown = this.keydown;
        document.onkeyup = this.keyup;
        document.onmousedown = this.mousedown;
        document.onmouseup = this.mouseup;
        document.onmousemove = this.mousemove;

        this.tickers.add(this.ticker);
      }
    } else {
      if (this.pointerLocked) {
        this.pointerLocked = false;

        this.app.stage.removeChild(this.pointer.sprite);

        document.onkeydown = null;
        document.onkeyup = null;
        document.onmousedown = null;
        document.onmouseup = null;
        document.onmousemove = null;

        this.tickers.remove(this.ticker);
      }
    }
  }

  assign(person: Person): void {
    this.person = person;

    person.sprite.rotation = 0;

    this.app.canvas.addEventListener('click', this.click);
    document.onpointerlockchange = this.pointerlockchange;
  }

  remove(): void {
    this.app.canvas.removeEventListener('click', this.click);
    document.onpointerlockchange = null;

    this.person = undefined;
  }
}
