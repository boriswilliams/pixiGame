import {  Texture, Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Projectile, ProjectileAnimation, ProjectileFactory } from './Projectile';
import { Class } from '../../utils/Class';

export abstract class Horizontal<H extends Horizontal<H>> extends Projectile<H> {

  constructor(projectileAnimation: ProjectileAnimation<H>, ...texture: Texture[]) {
    super(projectileAnimation, ...texture);
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
        const travel = ticker.deltaTime * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
      }
      tickers.add(movement);
    }
    super(horizontal, projectileAnimation, ...paths);
  }

  protected async buildHorizontal(...args: A) {
    return await super.buildProjectile(...args);
  }
}
