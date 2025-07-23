import { Application, Texture } from 'pixi.js';

import Object from './object/Object';
import ObjectBuilder from './object/ObjectBuilder';

type Key = 'w' | 'a' | 's' | 'd';

type keysType = {
  [K in Key]: boolean;
};

export class Boi extends Object {
  keys: keysType;
  speed: number;
  mousePos: {x: number, y: number}

  constructor(app: Application, ...textures: Texture[]) {
    super(app, ...textures);

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    this.speed = 5;

    this.mousePos = { x: 0, y: 0 };

    window.addEventListener('keydown', (e) => {
      if (e.key in this.keys) this.keys[e.key as Key] = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key in this.keys) this.keys[e.key as Key] = false;
    });

    app.ticker.add((time) => {
      const speed = time.deltaTime * this.speed;
      if (this.keys.w) this.sprite.y -= speed;
      if (this.keys.s) this.sprite.y += speed;
      if (this.keys.a) this.sprite.x -= speed;
      if (this.keys.d) this.sprite.x += speed;
      
      const dx = this.mousePos.x - this.sprite.x;
      const dy = this.mousePos.y - this.sprite.y;
      this.sprite.rotation = Math.atan2(dy, dx) + Math.PI/2;
    });

    app.stage.interactive = true;

    app.view.addEventListener('mousemove', (event) => {
      const rect = app.view.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    });
  }
}

export default class BoiBuilder extends ObjectBuilder {
  constructor(app: Application) {
    super(app, Boi, '/assets/boi.png', '/assets/gun.png');
  }
}