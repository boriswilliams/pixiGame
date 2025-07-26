import { Texture } from 'pixi.js';
import { Entity } from './entity/Entity';
import { Factory } from './entity/Factory';

export class Pointer extends Entity {

  constructor(...textures: Texture[]) {
    super(...textures);
  }
}

export class PointerFactory extends Factory<Pointer, []> {
  
  constructor() {
    super(Pointer, '/assets/pointer.png');
  }

  async build() {
    return await super.buildEntity();
  }
}