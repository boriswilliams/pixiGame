import { Ticker } from "pixi.js";

import { Entity } from "../../entities/entity/Entity";
import { Keyboard } from "./Keyboard";

export class AbsoluteKeyboard extends Keyboard {

  protected getAbsoluteMoveFunction(entity: Entity, speed: number) {
    return (time: Ticker) => {
      const travel = time.deltaTime * speed;
      if (this.keys.w) entity.sprite.y -= travel;
      if (this.keys.s) entity.sprite.y += travel;
      if (this.keys.a) entity.sprite.x -= travel;
      if (this.keys.d) entity.sprite.x += travel;
    };
  }

  addMovementTicker(entity: Entity, speed: number) {
    this.app.ticker.add((time) => {
      this.getAbsoluteMoveFunction(entity, speed)(time);
      this.track(entity);
    });
  }
}
