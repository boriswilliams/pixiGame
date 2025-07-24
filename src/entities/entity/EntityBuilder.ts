import { Assets, Texture } from 'pixi.js';

import Entity, { EntityConstructor } from './Entity';

export default abstract class EntityBuilder<T extends Entity<any>, Args extends any[]> {
  clazz: EntityConstructor<T, Args>;
  textures: Texture[] = [];
  ready: Promise<void>;

  constructor(clazz: EntityConstructor<T, Args>, ...paths: string[]) {
    this.clazz = clazz;
    
    this.ready = (async () => {
      this.textures = await Promise.all(paths.map(async (path) => {
        return await Assets.load(path);
      }));
    })();
  }

  async build(...args: Args) {
    await this.ready;
    return new this.clazz(...args, ...this.textures);
  }
}