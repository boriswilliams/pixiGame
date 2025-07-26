import { Entity } from "../../entities/entity/Entity";
import { Keyboard } from "./Keyboard";

export class RelativeKeyboard extends Keyboard {

  addMovementTicker(entity: Entity, speed: number) {
    this.app.ticker.add((time) => {
      this.getRelativeMoveFunction(entity, speed)(time);
      this.track(entity);
    });
  }
}
