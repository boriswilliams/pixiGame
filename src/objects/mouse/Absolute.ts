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
    return coordsAngle(this.target, location);
  }
  
  protected getTarget(_: Entity): Coords {
    return {...this.target};
  }

  addRotationTicker(entity: Entity) {
    // this.requestPointerLock();

    this.app.ticker.add(() => {
      this.target.x = this.app.renderer.events.pointer.global.x - this.world.x - this.app.screen.width / 2;
      this.target.y = this.app.renderer.events.pointer.global.y - this.world.y - this.app.screen.height / 2;
      entity.sprite.rotation = this.angleToMouse(entity.sprite);
    });
  }
}
