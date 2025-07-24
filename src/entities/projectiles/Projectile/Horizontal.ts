import {  Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Projectile, ProjectileBuilder, ProjectileConstructor } from './Projectile';

export type HorizontalConstructor<H extends Horizontal> = ProjectileConstructor<H>;

export class Horizontal extends Projectile {

}

export class HorizontalBuilder<H extends Horizontal> extends ProjectileBuilder<H> {
  constructor(
    clazz: HorizontalConstructor<H>,
    tickers: Tickers,
    speed: number,
    ...paths: string[]
  ) {
    const projectileAnimation = (projectile: Horizontal) => {
      const movement = (ticker: Ticker) => {
        const travel = ticker.deltaTime * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
      }
      tickers.add(movement);
    }
    super(clazz, projectileAnimation, ...paths);
  }
}
