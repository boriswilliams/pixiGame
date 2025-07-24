import { Texture } from 'pixi.js';

import { GunBuilder, Gun } from './Gun';
import { DartBuilder, Dart } from '../projectiles/Dart';
import { Spawner } from '../../objects/Spawner';

export class DartRifle extends Gun<Dart> {

  constructor(projectileBuilder: DartBuilder, spawner: Spawner, ...textures: Texture[]) {
    super(projectileBuilder, spawner, 15, ...textures);
  }
}

export class DartRifleBuilder extends GunBuilder<Dart> {
  
  constructor(projectileBuilder: DartBuilder, spawner: Spawner) {
    super(DartRifle, projectileBuilder, spawner, '/assets/gun.png');
  }
}