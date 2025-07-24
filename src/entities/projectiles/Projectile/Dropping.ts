import {  Ticker } from 'pixi.js';

import { Tickers } from '../../../objects/Tickers';
import { Spawner } from '../../../objects/Spawner';
import { Projectile, ProjectileBuilder, ProjectileConstructor } from './Projectile';

export type DroppingConstructor<D extends Dropping> = ProjectileConstructor<D>;

export class Dropping extends Projectile {

}

export class DroppingBuilder<D extends Dropping> extends ProjectileBuilder<D> {
  constructor(
    clazz: DroppingConstructor<D>,
    tickers: Tickers,
    spawner: Spawner,
    speed: number,
    lifetime: number,
    deadtime: number,
    ...paths: string[]
  ) {
    const projectileAnimation = (projectile: Dropping) => {
      const movement = (ticker: Ticker) => {
        const travel = ticker.deltaTime * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
      }
      tickers.add(movement);
      setTimeout(() => tickers.remove(movement), lifetime * 1000);
      setTimeout(() => spawner.remove(projectile), (lifetime + deadtime) * 1000);
    }
    super(clazz, projectileAnimation, ...paths);
  }
}