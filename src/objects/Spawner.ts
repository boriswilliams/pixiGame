import { Application } from "pixi.js";

import { Object } from "./Object";
import { Entity } from "../entities/entity/Entity";

export class Spawner extends Object {
  constructor(app: Application) {
    super(app);
  }

  add(entity: Entity) {
    this.app.stage.addChild(entity.sprite);
  }

  remove(entity: Entity) {
    this.app.stage.removeChild(entity.sprite);
    entity.sprite.destroy();
  }
}