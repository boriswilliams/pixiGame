import { Texture } from 'pixi.js';

import { GunFactory, Gun } from './Gun';
import { Light, LightFactory } from '../projectiles/Light';
import { Spawner } from '../../objects/Spawner';

export class LightGun extends Gun<Light> {

  constructor(projectileFactory: LightFactory, spawner: Spawner, ...textures: Texture[]) {
    super(projectileFactory, spawner, 15, ...textures);
  }
}

export class LightGunFactory extends GunFactory<LightGun, []> {
  
  constructor(projectileFactory: LightFactory, spawner: Spawner) {
    super(LightGun, projectileFactory, spawner, '/assets/lightGun.png');
  }

  async build() {
    return await super.buildGun();
  }
}