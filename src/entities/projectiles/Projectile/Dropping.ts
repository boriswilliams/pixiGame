import {  Texture, Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Spawner } from '../../../objects/Spawner';
import { Projectile, ProjectileAnimation, ProjectileFactory } from './Projectile';
import { distance } from '../../../utils/math';
import { Coords } from '../../../utils/types';
import { Class } from '../../utils/Class';

export abstract class Dropping<D extends Dropping<D>> extends Projectile<D> {
  spawn: Coords;
  destination: Coords;

  constructor(projectileAnimation: ProjectileAnimation<D>, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, ...textures);
    this.spawn = {x: this.sprite.x, y: this.sprite.y};
    this.destination = destination;
  }
}

export abstract class DroppingFactory<D extends Dropping<D>, A extends any[]> extends ProjectileFactory<D, [Coords, ...A]> {

  protected constructor(
    dropping: Class<D>,
    tickers: Tickers,
    spawner: Spawner,
    speed: number,
    deadtime: number,
    ...paths: string[]
  ) {
    const projectileAnimation = (projectile: D) => {
      const movement = (ticker: Ticker) => {
        const travel = ticker.deltaTime * speed;
        const oldCoords = {
          x: projectile.sprite.x,
          y: projectile.sprite.y
        }
        const newCoords = {
          x: oldCoords.x + travel * Math.sin(projectile.sprite.rotation),
          y: oldCoords.y - travel * Math.cos(projectile.sprite.rotation)
        }
        console.log(newCoords, oldCoords, projectile.destination);
        if (distance(newCoords, projectile.destination) > distance(projectile.sprite, projectile.destination)) {
          tickers.remove(movement)
          setTimeout(() => spawner.remove(projectile), deadtime * 1000);
          return;
        }
        projectile.sprite.x = newCoords.x;
        projectile.sprite.y = newCoords.y;
      }
      tickers.add(movement);
    }
    super(dropping, projectileAnimation, ...paths);
  }

  protected async buildDropping(...args: [Coords, ...A]) {
    return await super.buildProjectile(...args);
  }
}