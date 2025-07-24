import { Application } from "pixi.js";

import Object from "./Object";
import Entity from "../entities/entity/Entity";

export default class Mouse extends Object {
  mousePos: {x: number, y: number};
  clickHeld: boolean;

  constructor(app: Application) {
    super(app);
    
    this.mousePos = { x: 0, y: 0 };
    
    this.clickHeld = false;
    this.app.view.addEventListener('pointerdown', () => {this.clickHeld = true});
    this.app.view.addEventListener('pointerup', () => {this.clickHeld = false});
  }

  lookAtMouse(entity: Entity<any>) {
    this.app.view.addEventListener('mousemove', (event) => {
      const rect = this.app.view.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    });

    this.app.ticker.add(() => {
      const dx = this.mousePos.x - entity.sprite.x;
      const dy = this.mousePos.y - entity.sprite.y;
      entity.sprite.rotation = Math.atan2(dy, dx) + Math.PI/2;
    });
  }

  setHoldAction(func: () => void) {
    this.app.ticker.add(() => {
      if (this.clickHeld)
        func();
    });
  }
}