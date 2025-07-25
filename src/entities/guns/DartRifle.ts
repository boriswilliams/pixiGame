import { Texture } from 'pixi.js';

import { GunFactory, Gun } from './Gun';
import { DartFactory, Dart } from '../projectiles/Dart';
import { Spawner } from '../../objects/Spawner';

export class DartRifle extends Gun<Dart> {

  constructor(projectileFactory: DartFactory, spawner: Spawner, ...textures: Texture[]) {
    super(projectileFactory, spawner, 15, 5, ...textures);
  }
}

export class DartRifleFactory extends GunFactory<DartRifle, []> {
  
  constructor(projectileFactory: DartFactory, spawner: Spawner) {
    super(DartRifle, projectileFactory, spawner, '/assets/dartRifle.png');
  }

  async build() {
    return await super.buildGun();
  }
}