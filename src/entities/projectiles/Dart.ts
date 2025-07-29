import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';
import { ProjectileAnimation } from './Projectile/Projectile';
import { Texture } from 'pixi.js';

export class Dart extends Dropping<Dart> {

  constructor(projectileAnimation: ProjectileAnimation<Dart>, spawn: Coords, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, spawn, destination, ...textures);
    this.sprite.label = "Dart";
  }
}

export class DartFactory extends DroppingFactory<Dart, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Dart, tickers, spawner,
      8, // speed
      deadtime, '/assets/dart.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}