import { Application, Container } from "pixi.js";

import { Object } from "../Object";
import { Entity } from "../../entities/entity/Entity";
import { Coords } from "../../utils/types";
import { Pointer } from "../../entities/pointer";

export abstract class Mouse extends Object {
  pointer: Pointer;
  camera: Container;
  world: Container;
  clickHeld: boolean;
  holdAction: (() => void) | undefined;

  constructor(app: Application, pointer: Pointer, camera: Container, world: Container) {
    super(app);
    
    this.pointer = pointer;
    this.camera = camera;
    this.world = world;

    this.clickHeld = false;
    this.app.view.addEventListener('pointerdown', (event) => {
      if (event.button === 0) {
        this.clickHeld = true;
      }
    });
    this.app.view.addEventListener('pointerup', (event) => {
      if (event.button === 0) {
        this.clickHeld = false;
      }
    });
  }

  protected requestPointerLock() {
    this.app.canvas.addEventListener('click', () => {
      this.app.canvas.requestPointerLock();
    });
  }

  abstract addRotationTicker(entity: Entity): void;

  protected abstract getTarget(entity: Entity): Coords;

  setHoldAction(entity: Entity, start: (target: Coords) => void, stop: () => void) {
    this.removeHoldAction();
    this.holdAction = () => {
      if (this.clickHeld)
        start(this.getTarget(entity));
      else
        stop();
    }
    this.app.ticker.add(this.holdAction);
  }

  removeHoldAction() {
    if (this.holdAction)
      this.app.ticker.remove(this.holdAction);
  }
}