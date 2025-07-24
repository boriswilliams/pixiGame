import { Texture } from 'pixi.js';

import { Entity, EntityConstructor } from '../entity/Entity';
import { EntityBuilder } from '../entity/EntityBuilder';
import { Ticker } from '../../objects/Ticker';
import { Gun } from '../guns/Gun';

export type ProjectileConstructor<P extends Projectile> = EntityConstructor<Gun<P>, [AddMovementTicker, ...Texture[]]>;

type AddMovementTicker = (x: Projectile) => void;

export class Projectile extends Entity<[AddMovementTicker]> {

  constructor(addMovementTicker: AddMovementTicker, ...textures: Texture[]) {
    super(...textures);
    addMovementTicker(this);
  }
}

export class ProjectileBuilder<P extends Projectile> extends EntityBuilder<P, [AddMovementTicker]> {
  addMovementTicker: AddMovementTicker;

  constructor(clazz: EntityConstructor<P, [AddMovementTicker, ...Texture[]]>, ticker: Ticker, speed: number, ...paths: string[]) {
    super(clazz, ...paths);
    this.addMovementTicker = (projectile: Projectile) => {
      ticker.add((time) => {
        const travel = time.deltaTime * speed;
        projectile.sprite.y -= travel * Math.cos(projectile.sprite.rotation);
        projectile.sprite.x += travel * Math.sin(projectile.sprite.rotation);
      });
    }
  }

  build() {
    return super.build(this.addMovementTicker);
  }
}