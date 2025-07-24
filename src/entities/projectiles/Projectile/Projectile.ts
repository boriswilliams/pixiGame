import { Texture } from 'pixi.js';

import { Entity, EntityConstructor } from '../../entity/Entity';
import { EntityBuilder } from '../../entity/EntityBuilder';

export type ProjectileConstructor<P extends Projectile> = EntityConstructor<P, [ProjectileAnimation, ...Texture[]]>;

export type ProjectileAnimation = (x: Projectile) => void;

export class Projectile extends Entity<[ProjectileAnimation]> {

  constructor(projectileAnimation: ProjectileAnimation, ...textures: Texture[]) {
    super(...textures);
    projectileAnimation(this);
  }
}

export class ProjectileBuilder<P extends Projectile> extends EntityBuilder<P, [ProjectileAnimation]> {
  projectileAnimation: ProjectileAnimation;

  constructor(clazz: EntityConstructor<P, [ProjectileAnimation, ...Texture[]]>, projectileAnimation: ProjectileAnimation, ...paths: string[]) {
    super(clazz, ...paths);
    this.projectileAnimation = projectileAnimation;
  }

  build() {
    return super.build(this.projectileAnimation);
  }
}