import { Application, Container, Ticker } from "pixi.js";

import { Object } from "../Object";
import { Entity } from "../../entities/entity/Entity";
import { angleCoords } from "../../utils/math";

export abstract class Keyboard extends Object {
  keys: {[key: string]: boolean};
  world: Container;

  constructor(app: Application, world: Container) {
    super(app);
    
    this.world = world;

    this.keys = {};
    
    window.addEventListener('keydown', (e) => this.keys[e.key] = true);
    window.addEventListener('keyup', (e) => this.keys[e.key] = false);
  }

  protected getRelativeMoveFunction(entity: Entity, speed: number) {
    return (time: Ticker) => {
      const travel = time.deltaTime * speed;
      const { x, y } = angleCoords(entity.sprite.rotation);
      if (this.keys.w) {
        entity.sprite.x += x*travel;
        entity.sprite.y += y*travel;
      }
      if (this.keys.s) {
        entity.sprite.x -= x*travel;
        entity.sprite.y -= y*travel;
      }
      if (this.keys.a) {
        entity.sprite.x += y*travel;
        entity.sprite.y -= x*travel;
      }
      if (this.keys.d) {
        entity.sprite.x -= y*travel;
        entity.sprite.y += x*travel;
      }
    };
  }
  
  protected track(entity: Entity) {
    this.world.x = -entity.sprite.x;
    this.world.y = -entity.sprite.y;
  }

  abstract addMovementTicker(entity: Entity, speed: number): void;
}
