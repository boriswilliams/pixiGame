import { Texture } from 'pixi.js';
import { Tickers } from '../../objects/Tickers';
import { Coords } from '../../utils/types';
import { SCALE } from '../../values';
import { Horizontal, HorizontalFactory } from './Projectile/Horizontal';
import { ProjectileAnimation } from './Projectile/Projectile';

export class Light extends Horizontal<Light> {

  constructor(projectileAnimation: ProjectileAnimation<Light>, spawn: Coords, destination: Coords, ...textures: Texture[]) {
    super(projectileAnimation, spawn, destination, ...textures);
    this.sprite.label = "Light";
  }
}

export class LightFactory extends HorizontalFactory<Light, []> {
  constructor(tickers: Tickers) {
    super(Light, tickers,
      40/SCALE, // speed
      '/assets/light.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildHorizontal(spawn, destination);
  }
}