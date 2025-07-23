import { Application, Sprite } from "pixi.js";

import FunctionalObject from "./Object";

export default class Mouse extends FunctionalObject {
  mousePos: {x: number, y: number};

  constructor(app: Application) {
    super(app);
    this.mousePos = { x: 0, y: 0 };
  }

  lookAtMouse(sprite: Sprite) {
    this.app.stage.interactive = true;

    this.app.view.addEventListener('mousemove', (event) => {
      const rect = this.app.view.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    });

    this.app.ticker.add(() => {
      const dx = this.mousePos.x - sprite.x;
      const dy = this.mousePos.y - sprite.y;
      sprite.rotation = Math.atan2(dy, dx) + Math.PI/2;
    });
  }
}