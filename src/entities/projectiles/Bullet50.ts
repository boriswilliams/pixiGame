import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';
import { ProjectileAnimation } from './Projectile/Projectile';
import { Texture } from 'pixi.js';

export class Bullet50 extends Dropping<Bullet50> {

  constructor(projectileAnimation: ProjectileAnimation<Bullet50>, spawn: Coords, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, spawn, destination, ...textures);
    this.sprite.label = "Bullet50";
  }
}

export class Bullet50Factory extends DroppingFactory<Bullet50, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Bullet50, tickers, spawner,
      10, // speed
      deadtime, '/assets/50cal.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}