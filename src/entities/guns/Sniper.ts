import { Texture } from 'pixi.js';

import { GunFactory, Gun } from './Gun';
import { Bullet50Factory, Bullet50 } from '../projectiles/Bullet50';
import { Spawner } from '../../objects/Spawner';

export class Sniper extends Gun<Bullet50> {

  constructor(projectileFactory: Bullet50Factory, spawner: Spawner, ...textures: Texture[]) {
    super(projectileFactory, spawner,
      25, // gunLength
      0, // variance
      1000, // fireGap
      1, // shots
      ...textures);
  }
}

export class SniperFactory extends GunFactory<Sniper, []> {
  
  constructor(projectileFactory: Bullet50Factory, spawner: Spawner) {
    super(Sniper, projectileFactory, spawner, '/assets/sniper.png');
  }

  async build() {
    return await super.buildGun();
  }
}