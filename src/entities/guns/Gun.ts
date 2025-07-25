import { Sprite, Texture } from 'pixi.js';

import { Entity } from '../entity/Entity';
import { ProjectileFactory, Projectile } from '../projectiles/Projectile/Projectile';
import { SCALE } from '../../values';
import { Spawner } from '../../objects/Spawner';
import { Class } from '../utils/Class';
import { Factory } from '../entity/Factory';
import { Coords } from '../../utils/types';
import { angleCoords, distance, exponentialRandom } from '../../utils/math';

export abstract class Gun<P extends Projectile<P>> extends Entity {
  projectileFactory: ProjectileFactory<P, any>;
  spawner: Spawner;
  gunLength: number;
  private variance: number;
  private lastShot: number | undefined;
  private fireGap: number;
  private shots: number;

  protected constructor(projectileFactory: ProjectileFactory<P, any>, spawner: Spawner, gunLength: number, variance: number, fireGap: number, shots: number, ...textures: Texture[]) {
    super(...textures);
    this.projectileFactory = projectileFactory;
    this.spawner = spawner;
    this.gunLength = gunLength * SCALE;
    this.variance = variance;
    this.fireGap = fireGap;
    this.shots = shots;
  }

  private applyVariance(mouse: Coords, dist: number) {
    const diff = angleCoords(Math.random() * 2 * Math.PI);
    const mul = exponentialRandom() * this.variance * (1/4 + dist/3000);
    return {
      x: mouse.x + diff.x * mul,
      y: mouse.y + diff.y * mul
    }
  }

  async shoot(parent: Sprite, location: Coords) {
    if (this.lastShot && Date.now() < this.lastShot + this.fireGap)
      return;
    if (this.lastShot)
      this.lastShot += this.fireGap;
    else
      this.lastShot = Date.now();
    const x = parent.x + this.gunLength * Math.sin(parent.rotation);
    const y = parent.y - this.gunLength * Math.cos(parent.rotation);
    const spawn = {x: x, y: y};
    for (let _ = 0; _ < this.shots; _++) {
      const projectile = await this.projectileFactory.build(spawn, this.applyVariance(location, distance(spawn, location)));
      projectile.sprite.position.set(x, y);
      projectile.sprite.rotation = parent.rotation;
      this.spawner.add(projectile)
    }
  }

  stop() {
    this.lastShot = undefined;
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