import {  Texture, Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Spawner } from '../../../objects/Spawner';
import { Projectile, ProjectileAnimation, ProjectileFactory } from './Projectile';
import { distance, ratioXY, trajectory } from '../../../utils/math';
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
        const oldCoords = {
          x: projectile.sprite.x,
          y: projectile.sprite.y
        }
        const travelled = distance(oldCoords, projectile.destination);

        const x = 1 + projectile.distance / 1000;
        const scale = 1 + x * trajectory(travelled / projectile.distance);
        projectile.sprite.scale = scale;

        const travel = ticker.elapsedMS / 17 * speed * (0.4 + projectile.distance/200);
        const { rx, ry } = ratioXY(projectile.destination, projectile.spawn);
        const newCoords = {
          x: oldCoords.x + travel * rx,
          y: oldCoords.y + travel * ry
        }
        if (distance(newCoords, projectile.destination) > travelled) {
          tickers.remove(movement)
          setTimeout(() => {
            spawner.remove(projectile);
            projectile.sprite.destroy();
          }, deadtime * 1000);
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