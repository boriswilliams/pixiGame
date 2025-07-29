import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';
import { ProjectileAnimation } from './Projectile/Projectile';
import { Texture } from 'pixi.js';

export class Pellet extends Dropping<Pellet> {

  constructor(projectileAnimation: ProjectileAnimation<Pellet>, spawn: Coords, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, spawn, destination, ...textures);
    this.sprite.label = "Pellet";
  }
}

export class PelletFactory extends DroppingFactory<Pellet, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Pellet, tickers, spawner,
      10, // speed
      deadtime, '/assets/pellet.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}