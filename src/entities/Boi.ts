import { Texture } from 'pixi.js';

import { Entity } from './entity/Entity';
import { EntityBuilder } from './entity/EntityBuilder';
import { Gun } from './guns/Gun';
import { Projectile } from './projectiles/Projectile/Projectile';

export class Boi extends Entity<[]> {
  gun: Gun<Projectile> | undefined;

  constructor(...textures: Texture[]) {
    super(...textures);
  }

  async shoot() {
    this.gun?.shoot(this.sprite);
  }

  giveGun(gun: Gun<Projectile>) {
    this.gun = gun;
    this.addSprite(gun.sprite);
  }
}

export class BoiBuilder extends EntityBuilder<Boi, []> {
  
  constructor() {
    super(Boi, '/assets/boi.png');
  }

  build() {
    return super.build();
  }
}