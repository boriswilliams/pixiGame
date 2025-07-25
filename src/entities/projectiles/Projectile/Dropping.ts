import {  Texture, Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Spawner } from '../../../objects/Spawner';
import { Projectile, ProjectileAnimation, ProjectileFactory } from './Projectile';
import { distance, ratioXY } from '../../../utils/math';
import { Class } from '../../utils/Class';
import { Coords } from '../../../utils/types';

export abstract class Dropping<D extends Dropping<D>> extends Projectile<D> {

  constructor(projectileAnimation: ProjectileAnimation<D>, spawn: Coords, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, spawn, destination, ...textures);
  }
}

export abstract class DroppingFactory<D extends Dropping<D>, A extends any[]> extends ProjectileFactory<D, A> {

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
        const travel = ticker.deltaTime * speed * (0.3 + distance(projectile.destination, projectile.spawn)/150);
        const oldCoords = {
          x: projectile.sprite.x,
          y: projectile.sprite.y
        }
        const { rx, ry } = ratioXY(projectile.destination, projectile.spawn);
        const newCoords = {
          x: oldCoords.x + travel * rx,
          y: oldCoords.y + travel * ry
        }
        if (distance(newCoords, projectile.destination) > distance(oldCoords, projectile.destination)) {
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

  protected async buildDropping(spawn: Coords, destination: Coords, ...args: A) {
    return await super.buildProjectile(spawn, destination, ...args);
  }
}