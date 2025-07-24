import { Application } from "pixi.js";

import { Object } from "./Object";
import { Entity } from "../entities/entity/Entity";

export class Keyboard extends Object {
  keys: {[key: string]: boolean};

  constructor(app: Application) {
    super(app);

    this.keys = {};
    
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
  }

  moveWasd(entity: Entity<any>, speed: number) {
    this.app.ticker.add((time) => {
      const travel = time.deltaTime * speed;
      if (this.keys.w) entity.sprite.y -= travel;
      if (this.keys.s) entity.sprite.y += travel;
      if (this.keys.a) entity.sprite.x -= travel;
      if (this.keys.d) entity.sprite.x += travel;
    });
  }
}
