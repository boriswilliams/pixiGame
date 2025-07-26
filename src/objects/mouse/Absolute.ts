import { Application, Container } from "pixi.js";

import { Entity } from "../../entities/entity/Entity";
import { Coords } from "../../utils/types";
import { coordsAngle } from "../../utils/math";
import { Mouse } from "./Mouse";
import { Pointer } from "../../entities/pointer";

export class AbsoluteMouse extends Mouse {
  target = { x: 0, y: 0 };

  constructor(app: Application, pointer: Pointer, camera: Container, world: Container) {
    super(app, pointer, camera, world);
    camera.position.set(app.screen.width / 2, app.screen.height / 2);
  }

  private angleToMouse(location: Coords) {
    return coordsAngle(this.getTarget(), location);
  }
  
  protected getTarget(): Coords {
    return {
      x: this.target.x - this.world.x - this.app.screen.width / 2,
      y: this.target.y - this.world.y - this.app.screen.height / 2
    };
  }

  addRotationTicker(entity: Entity) {
    this.requestPointerLock();

    this.app.view.addEventListener('mousemove', (event) => {
      this.target.x += event.movementX;
      this.target.y += event.movementY;
    });

    this.app.ticker.add(() => {
      entity.sprite.rotation = this.angleToMouse(entity.sprite);
      this.pointer.sprite.x = this.target.x;
      this.pointer.sprite.y = this.target.y;
      console.log(this.pointer.sprite.x);
      console.log(this.pointer.sprite.y);
    });
  }
}
