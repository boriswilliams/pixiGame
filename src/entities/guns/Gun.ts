import { Sprite, Texture } from 'pixi.js';

import { Entity } from '../entity/Entity';
import { ProjectileFactory, Projectile } from '../projectiles/Projectile/Projectile';
import { SCALE } from '../../values';
import { Spawner } from '../../objects/Spawner';
import { Class } from '../utils/Class';
import { Factory } from '../entity/Factory';
import { Coords } from '../../utils/types';

export abstract class Gun<P extends Projectile<P>> extends Entity {
  projectileFactory: ProjectileFactory<P, any>;
  spawner: Spawner;
  gunLength: number;

  protected constructor(projectileFactory: ProjectileFactory<P, any>, spawner: Spawner, gunLength: number, ...textures: Texture[]) {
    super(...textures);
    this.projectileFactory = projectileFactory;
    this.spawner = spawner;
    this.gunLength = gunLength * SCALE;
  }

  async shoot(parent: Sprite, mouseLocation: Coords) {
    const x = parent.x + this.gunLength * Math.sin(parent.rotation);
    const y = parent.y - this.gunLength * Math.cos(parent.rotation);
    const projectile = await this.projectileFactory.build(mouseLocation);
    projectile.sprite.position.set(x, y);
    projectile.sprite.rotation = parent.rotation;
    this.spawner.add(projectile)
  }
}

export abstract class GunFactory<G extends Gun<any>, A extends any[]>
    extends Factory<G, [ProjectileFactory<any, any>, Spawner, ...A]> {
  projectileFactory: ProjectileFactory<any, any>;
  spawner: Spawner;

  protected constructor(
    gun: Class<G>,
    projectileFactory: ProjectileFactory<any, any>,
    spawner: Spawner,
    ...paths: string[]
  ) {
    super(gun, ...paths);
    this.projectileFactory = projectileFactory;
    this.spawner = spawner;
  }

  protected buildGun(...args: A) {
    return super.buildEntity(this.projectileFactory, this.spawner, ...args);
  }
}