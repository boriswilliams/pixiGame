import { Application, Sprite, Texture } from 'pixi.js';

import { Entity, EntityConstructor } from '../entity/Entity';
import { EntityBuilder } from '../entity/EntityBuilder';
import { ProjectileBuilder, Projectile } from '../projectiles/Projectile';

export type GunConstructor<P extends Projectile, Args extends any[]> = EntityConstructor<Gun<P>, [ProjectileBuilder<P>, Application, ...Args, ...Texture[]]>;

export abstract class Gun<P extends Projectile> extends Entity<Gun<P>> {
  projectileBuilder: ProjectileBuilder<P>;
  app: Application;
  gunLength: number;

  protected constructor(projectileBuilder: ProjectileBuilder<P>, app: Application, gunLength: number, ...textures: Texture[]) {
    super(...textures);
    this.projectileBuilder = projectileBuilder;
    this.app = app;
    this.gunLength = gunLength;
  }

  async shoot(parent: Sprite) {
    const projectile = await this.projectileBuilder.build();
    const x = parent.x + this.gunLength * Math.sin(parent.rotation);
    const y = parent.y - this.gunLength * Math.cos(parent.rotation);
    projectile.sprite.position.set(x, y);
    projectile.sprite.rotation = parent.rotation;
    this.app.stage.addChild(projectile.sprite)
  }
}

export abstract class GunBuilder<P extends Projectile> extends EntityBuilder<Gun<P>, [ProjectileBuilder<P>, Application, ...Texture[]]> {
  projectileBuilder: ProjectileBuilder<P>;
  app: Application;

  protected constructor(clazz: GunConstructor<P, []>, projectileBuilder: ProjectileBuilder<P>, app: Application, ...paths: string[]) {
    super(clazz, ...paths);
    this.projectileBuilder = projectileBuilder;
    this.app = app;
  }

  build() {
    return super.build(this.projectileBuilder, this.app);
  }
}