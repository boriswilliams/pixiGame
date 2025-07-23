import { Assets, Texture } from 'pixi.js';

import { EntityConstructor } from './Entity';

export default abstract class EntityBuilder {
  clazz: EntityConstructor;
  textures: Texture[] = [];
  ready: Promise<void>;

  constructor(clazz: EntityConstructor, ...paths: string[]) {
    this.clazz = clazz;
    
    this.ready = (async () => {
      this.textures = await Promise.all(paths.map(async (path) => {
        return await Assets.load(path);
      }));
    })();
  }

  async build() {
    await this.ready;
    return new this.clazz(this.textures[0], ...this.textures);
  }
}