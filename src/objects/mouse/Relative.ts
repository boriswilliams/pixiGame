import { Application, Container } from "pixi.js";

import { RELATIVE_PLAYER_POSITION } from "../../values";

import { Entity } from "../../entities/entity/Entity";
import { angle, angleCoords, minMax } from "../../utils/math";
import { Mouse } from "./Mouse";
import { Pointer } from "../../entities/pointer";

export class RelativeMouse extends Mouse {
  distance = 100;

  constructor(app: Application, pointer: Pointer, camera: Container, world: Container) {
    super(app, pointer, camera, world);
    
    app.stage.addChild(pointer.sprite);
    pointer.sprite.position.set(app.screen.width / 2, this.distance);
    camera.position.set(app.screen.width / 2, app.screen.height * (1 - RELATIVE_PLAYER_POSITION));
  }

  protected getTarget(entity: Entity) {
    const { x, y } = angleCoords(-this.camera.rotation);
    return {
      x: entity.sprite.x + x * this.distance,
      y: entity.sprite.y + y * this.distance
    }
  }

  addRotationTicker(entity: Entity) {
    this.requestPointerLock();

    document.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement === this.app.canvas) {
        const dx = event.movementX;
        const dy = event.movementY;
        
        entity.sprite.rotation -= angle(this.distance, dx) + Math.PI;
        this.camera.rotation = -entity.sprite.rotation;

        this.distance = minMax(
          0,
          this.distance - dy,
          this.app.screen.height * (1 - RELATIVE_PLAYER_POSITION)
        );

        this.pointer.sprite.y = this.app.screen.height * (1 - RELATIVE_PLAYER_POSITION) - this.distance;
      }
    });
  }
}
