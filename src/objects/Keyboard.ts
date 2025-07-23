import { Application, Sprite } from "pixi.js";

import FunctionalObject from "./Object";

export default class Keyboard extends FunctionalObject {
  keys: {[key: string]: boolean};

  constructor(app: Application) {
    super(app);

    this.keys = {};
    
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
  }

  moveWasd(sprite: Sprite, speed: number) {
    this.app.ticker.add((time) => {
      const travel = time.deltaTime * speed;
      if (this.keys.w) sprite.y -= travel;
      if (this.keys.s) sprite.y += travel;
      if (this.keys.a) sprite.x -= travel;
      if (this.keys.d) sprite.x += travel;
    });
  }
}
