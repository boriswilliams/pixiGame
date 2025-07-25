import { Application } from "pixi.js";

import { Object } from "./Object";
import { Entity } from "../entities/entity/Entity";
import { Coords } from "../utils/types";
import { coordsAngle } from "../utils/math";

export class Mouse extends Object {
  mousePos: Coords;
  clickHeld: boolean;

  constructor(app: Application) {
    super(app);
    
    this.mousePos = { x: 0, y: 0 };
    
    this.clickHeld = false;
    this.app.view.addEventListener('pointerdown', () => {this.clickHeld = true});
    this.app.view.addEventListener('pointerup', () => {this.clickHeld = false});
  }

  protected angleToMouse(location: Coords) {
    return coordsAngle(this.mousePos, location);
  }

  lookAtMouse(entity: Entity) {
    this.app.view.addEventListener('mousemove', (event) => {
      const rect = this.app.view.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    });

    this.app.ticker.add(() => {
      entity.sprite.rotation = this.angleToMouse(entity.sprite);
    });
  }

  setHoldAction(func: (mousePos: Coords) => void) {
    this.app.ticker.add(() => {
      if (this.clickHeld)
        func({...this.mousePos});
    });
  }
}