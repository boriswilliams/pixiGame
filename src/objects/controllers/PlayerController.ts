import { Application, Container, Ticker } from "pixi.js";

import { Controller } from "./Controller";
import { Pointer } from "../../entities/pointer";
import { Person } from "../../entities/person/Person";
import { angleCoords, coordsAngle, vectorAdd, vectorScale } from "../../utils/math";
import { Tickers } from "../Tickers";
import { Coords } from "../../utils/types";
import { RELATIVE_PLAYER_POSITION } from "../../values";

const MOVEMENT_SPEED = 3;

export class PlayerController extends Controller {
  camera: Container;
  world: Container;
  tickers: Tickers;
  pointer: Pointer;

  person: Person | undefined;

  relative = false;
  keys: {[key: string]: boolean} = {};
  scoped = false;
  target = { x: 0, y: 0 }

  constructor(app: Application, camera: Container, world: Container, tickers: Tickers, pointer: Pointer) {
    super(app);
    
    this.camera = camera;
    this.world = world;
    this.tickers = tickers;
    this.pointer = pointer;

    this.keys;
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

  ticker = (time: Ticker) => {
    const deltaTime = time.deltaTime;
    
    // Shoot
    if (this.isShooting) {
      this.person!.shoot(this.target);
    }

    // Rotate Player
    this.person!.sprite.rotation = coordsAngle(this.target, this.person!.sprite);

    // Rotate camera
    if (this.relative) {
      this.camera.rotation = -this.person!.sprite.rotation;
    } else {
      this.camera.rotation = 0;
    }

    // Move
    const travel = deltaTime * MOVEMENT_SPEED;
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
    if (this.scoped) {
      this.world.x = -this.target.x;
      this.world.y = -this.target.y;
    } else {
      this.world.x = -this.person!.sprite.x;
      this.world.y = -this.person!.sprite.y;
      if (this.relative) {
        const a = this.transform({
          x: 0,
          y: this.app.screen.height * (1/2 - RELATIVE_PLAYER_POSITION)
        })
        vectorAdd(this.world, a);
      }
    }

    // Set crosshair location
    const crosshair = this.world.toGlobal(this.target);
    this.pointer.sprite.position.set(crosshair.x, crosshair.y);
  }


  assign(person: Person): void {
    this.person = person;

    this.app.stage.addChild(this.pointer.sprite);
    this.pointer.sprite.position.set(this.app.screen.width / 2, this.app.screen.height / 2);

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
    window.addEventListener('mousedown', this.mousedown);
    window.addEventListener('mouseup', this.mouseup);
    window.addEventListener('mousemove', this.mousemove);
    this.tickers.add(this.ticker);
  }

  remove(): void {
    this.app.stage.removeChild(this.pointer.sprite);

    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);
    window.removeEventListener('mousedown', this.mousedown);
    window.removeEventListener('mouseup', this.mouseup);
    window.removeEventListener('mousemove', this.mousemove);
    this.tickers.remove(this.ticker);

    this.person = undefined;
  }
}
