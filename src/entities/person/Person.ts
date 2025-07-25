import { Texture } from 'pixi.js';

import { Entity } from '../entity/Entity';
import { Gun } from '../guns/Gun';
import { Projectile } from '../projectiles/Projectile/Projectile';
import { Factory } from '../entity/Factory';
import { Coords } from '../../utils/types';

export class Person extends Entity {
  gun: Gun<Projectile<any>> | undefined;

  constructor(...textures: Texture[]) {
    super(...textures);
  }

  shoot(mouseLocation: Coords) {
    this.gun?.shoot(this.sprite, mouseLocation);
  }

  stopShooting() {
    this.gun?.stop();
  }

  giveGun(gun: Gun<Projectile<any>>) {
    this.gun = gun;
    this.addSprite(gun.sprite);
  }
}

export class PersonFactory extends Factory<Person, []> {

  async build() {
    return await super.buildEntity();
  }
}