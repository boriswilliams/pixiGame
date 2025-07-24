import { Texture } from 'pixi.js';

import { GunBuilder, Gun } from './Gun';
import { Light, LightBuilder } from '../projectiles/Light';
import { Spawner } from '../../objects/Spawner';

export class LightGun extends Gun<Light> {

  constructor(projectileBuilder: LightBuilder, spawner: Spawner, ...textures: Texture[]) {
    super(projectileBuilder, spawner, 18, ...textures);
  }
}

export class LightGunBuilder extends GunBuilder<Light> {
  
  constructor(projectileBuilder: LightBuilder, spawner: Spawner) {
    super(LightGun, projectileBuilder, spawner, '/assets/lightGun.png');
  }
}