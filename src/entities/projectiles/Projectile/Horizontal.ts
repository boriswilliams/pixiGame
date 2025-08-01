import {  Texture, Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Projectile, ProjectileAnimation, ProjectileFactory } from './Projectile';
import { Class } from '../../utils/Class';
import { Coords } from '../../../utils/types';
import { MAX_PROJECTILE_LIFETIME } from '../../../values';

export abstract class Horizontal<H extends Horizontal<H>> extends Projectile<H> {
  time = 0;

  constructor(projectileAnimation: ProjectileAnimation<H>, spawn: Coords, destination: Coords, ...texture: Texture[]) {
    super(projectileAnimation, spawn, destination, ...texture);
  }
}

export abstract class HorizontalFactory<H extends Horizontal<H>, A extends any[]> extends ProjectileFactory<H, A> {

  protected constructor(
    horizontal: Class<H>,
    tickers: Tickers,
    speed: number,
    ...paths: string[]
  ) {
    const projectileAnimation = (projectile: Horizontal<H>) => {
      const movement = (ticker: Ticker) => {
        projectile.time += ticker.elapsedMS;
        const travel = ticker.elapsedMS / 17 * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
        if (projectile.time > MAX_PROJECTILE_LIFETIME * 1000) {
          tickers.remove(movement)
          projectile.sprite.destroy();
        }
      }
      tickers.add(movement);
    }
    super(horizontal, projectileAnimation, ...paths);
  }

  protected async buildHorizontal(spawn: Coords, destination: Coords, ...args: A) {
    return await super.buildProjectile(spawn, destination, ...args);
  }
}
