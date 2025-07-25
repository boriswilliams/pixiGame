import { Sprite, Texture } from 'pixi.js';

import { GunFactory, Gun } from './Gun';
import { PelletFactory, Pellet } from '../projectiles/Pellet';
import { Spawner } from '../../objects/Spawner';
import { Coords } from '../../utils/types';

export class BBGun extends Gun<Pellet> {

  constructor(projectileFactory: PelletFactory, spawner: Spawner, ...textures: Texture[]) {
    super(projectileFactory, spawner, 15, 10, ...textures);
  }
  
  async shoot(parent: Sprite, mouseLocation: Coords) {
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
    super.shoot(parent, mouseLocation);
  }
}

export class BBGunFactory extends GunFactory<BBGun, []> {
  
  constructor(projectileFactory: PelletFactory, spawner: Spawner) {
    super(BBGun, projectileFactory, spawner, '/assets/bbGun.png');
  }

  async build() {
    return await super.buildGun();
  }
}