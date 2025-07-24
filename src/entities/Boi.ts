import { Texture } from 'pixi.js';

import { Entity } from './entity/Entity';
import { Gun } from './guns/Gun';
import { Projectile } from './projectiles/Projectile/Projectile';
import { Factory } from './entity/Factory';
import { Coords } from '../utils/types';

export class Boi extends Entity {
  gun: Gun<Projectile<any>> | undefined;

  constructor(...textures: Texture[]) {
    super(...textures);
  }

  async shoot(mouseLocation: Coords) {
    this.gun?.shoot(this.sprite, mouseLocation);
  }

  giveGun(gun: Gun<Projectile<any>>) {
    this.gun = gun;
    this.addSprite(gun.sprite);
  }
}

export class BoiFactory extends Factory<Boi, []> {
  
  constructor() {
    super(Boi, '/assets/boi.png');
  }

  async build() {
    return await super.buildEntity();
  }
}