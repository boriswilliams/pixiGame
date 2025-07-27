import { Texture } from 'pixi.js';

import { GunFactory, Gun } from './Gun';
import { PelletFactory, Pellet } from '../projectiles/Pellet';
import { Spawner } from '../../objects/Spawner';

export class BBGun extends Gun<Pellet> {

  constructor(projectileFactory: PelletFactory, spawner: Spawner, ...textures: Texture[]) {
    super(projectileFactory, spawner,
      15, // gunLength
      10, // variance
      25, // fireGap
      30, // shots
      ...textures);
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