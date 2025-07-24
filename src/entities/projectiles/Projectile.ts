import { Texture, Ticker } from 'pixi.js';

import { Entity, EntityConstructor } from '../entity/Entity';
import { EntityBuilder } from '../entity/EntityBuilder';
import { Tickers } from '../../objects/Tickers';
import { Gun } from '../guns/Gun';
import { Spawner } from '../../objects/Spawner';

export type ProjectileConstructor<P extends Projectile> = EntityConstructor<Gun<P>, [ProjectileAnimation, ...Texture[]]>;

type ProjectileAnimation = (x: Projectile) => void;

export class Projectile extends Entity<[ProjectileAnimation]> {

  constructor(projectileAnimation: ProjectileAnimation, ...textures: Texture[]) {
    super(...textures);
    projectileAnimation(this);
  }
}

export class ProjectileBuilder<P extends Projectile> extends EntityBuilder<P, [ProjectileAnimation]> {
  projectileAnimation: ProjectileAnimation;

  constructor(clazz: EntityConstructor<P, [ProjectileAnimation, ...Texture[]]>, tickers: Tickers, spawner: Spawner, speed: number, lifetime: number, deadtime: number, ...paths: string[]) {
    super(clazz, ...paths);
    this.projectileAnimation = (projectile: Projectile) => {
      const movement = (ticker: Ticker) => {
        const travel = ticker.deltaTime * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
      }
      tickers.add(movement);
      setTimeout(() => tickers.remove(movement), lifetime * 1000);
      setTimeout(() => spawner.remove(projectile), (lifetime + deadtime) * 1000);
    }
  }

  build() {
    return super.build(this.projectileAnimation);
  }
}