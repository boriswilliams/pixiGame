import { Application } from "pixi.js";

import { Object } from "../Object";
import { Entity } from "../../entities/entity/Entity";

export abstract class Controller extends Object {
  protected isShooting = false;

  constructor(app: Application) {
    super(app);
  }

  abstract assign(entity: Entity): void;
  
  abstract remove(): void;
}
