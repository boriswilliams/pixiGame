import { Texture } from 'pixi.js';

import { Entity } from '../../entity/Entity';
import { Factory } from '../../entity/Factory';
import { Class } from '../../utils/Class';
import { Coords } from '../../../utils/types';

export type ProjectileAnimation<P extends Projectile<P>> = (x: P) => void;

export abstract class Projectile<P extends Projectile<P>> extends Entity {
  spawn: Coords;
  destination: Coords;

  protected constructor(projectileAnimation: ProjectileAnimation<P>, spawn: Coords, destination: Coords, ...texture: Texture[]) {
    super(...texture);
    this.spawn = spawn;
    this.destination = destination;
    projectileAnimation(this as unknown as P);
  }
}

export abstract class ProjectileFactory<P extends Projectile<P>, A extends any[]> extends Factory<P, [ProjectileAnimation<P>, Coords, Coords, ...A]> {
  protected projectileAnimation: ProjectileAnimation<P>;

  protected constructor(
    projectile: Class<P>,
    projectileAnimation: ProjectileAnimation<P>,
    ...paths: string[]
  ) {
    super(projectile, ...paths);
    this.projectileAnimation = projectileAnimation;
  }

  protected async buildProjectile(...args: [Coords, Coords, ...A]) {
    return await super.buildEntity(this.projectileAnimation, ...args);
  }
}