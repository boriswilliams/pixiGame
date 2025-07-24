import { Sprite, Texture } from 'pixi.js';

import { Entity, EntityConstructor } from '../entity/Entity';
import { EntityBuilder } from '../entity/EntityBuilder';
import { ProjectileBuilder, Projectile } from '../projectiles/Projectile';
import { SCALE } from '../../values';
import { Spawner } from '../../objects/Spawner';

export type GunConstructor<P extends Projectile, Args extends any[]> = EntityConstructor<Gun<P>, [ProjectileBuilder<P>, Spawner, ...Args, ...Texture[]]>;

export abstract class Gun<P extends Projectile> extends Entity<Gun<P>> {
  projectileBuilder: ProjectileBuilder<P>;
  spawner: Spawner;
  gunLength: number;

  protected constructor(projectileBuilder: ProjectileBuilder<P>, spawner: Spawner, gunLength: number, ...textures: Texture[]) {
    super(...textures);
    this.projectileBuilder = projectileBuilder;
    this.spawner = spawner;
    this.gunLength = gunLength * SCALE;
  }

  async shoot(parent: Sprite) {
    const projectile = await this.projectileBuilder.build();
    const x = parent.x + this.gunLength * Math.sin(parent.rotation);
    const y = parent.y - this.gunLength * Math.cos(parent.rotation);
    projectile.sprite.position.set(x, y);
    projectile.sprite.rotation = parent.rotation;
    this.spawner.add(projectile)
  }
}

export abstract class GunBuilder<P extends Projectile> extends EntityBuilder<Gun<P>, [ProjectileBuilder<P>, Spawner, ...Texture[]]> {
  projectileBuilder: ProjectileBuilder<P>;
  spawner: Spawner;

  protected constructor(clazz: GunConstructor<P, []>, projectileBuilder: ProjectileBuilder<P>, spawner: Spawner, ...paths: string[]) {
    super(clazz, ...paths);
    this.projectileBuilder = projectileBuilder;
    this.spawner = spawner;
  }

  build() {
    return super.build(this.projectileBuilder, this.spawner);
  }
}