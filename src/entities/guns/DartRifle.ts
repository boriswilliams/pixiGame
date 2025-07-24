import { Application, Texture } from 'pixi.js';

import { GunBuilder, Gun } from './Gun';
import { DartBuilder, Dart } from '../projectiles/Dart';

export class DartRifle extends Gun<Dart> {

  constructor(projectileBuilder: DartBuilder, app: Application, ...textures: Texture[]) {
    super(projectileBuilder, app, 15, ...textures);
  }
}

export class DartRifleBuilder extends GunBuilder<Dart> {
  
  constructor(projectileBuilder: DartBuilder, app: Application) {
    super(DartRifle, projectileBuilder, app, '/assets/gun.png');
  }
}