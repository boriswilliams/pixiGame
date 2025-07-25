import { Application, TickerCallback } from "pixi.js";

import { Controller } from "./Controller";
import { Entity } from "../../entities/entity/Entity";
import { angleCoords, randomAngle, randomBool } from "../../utils/math";

export class BotController extends Controller {
  private func: TickerCallback<any> | undefined;
  private movementDirection = randomAngle();

  constructor(app: Application) {
    super(app);
  }

  assign(entity: Entity) {
    if (this.func) {
      throw new Error("Controller already in use");
    }
    this.func = () => {
      if (randomBool(0.010))
        entity.sprite.rotation = randomAngle();
      if (randomBool(0.005))
        this.movementDirection = randomAngle();
      const speed = 0.3;
      const {x, y} = angleCoords(this.movementDirection);
      entity.sprite.x += x * speed;
      entity.sprite.y += y * speed;
    };
    this.app.ticker.add(this.func);
  }

  remove() {
    if (!this.func) {
      throw new Error("Trying to remove controller that doesn't exist");
    }
    this.app.ticker.remove(this.func);
    this.func = undefined;
  }
}
