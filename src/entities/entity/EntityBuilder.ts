import { Assets, Texture } from 'pixi.js';

import Entity, { EntityConstructor } from './Entity';

export default abstract class EntityBuilder<E extends Entity<any>, EArgs extends any[]> {
  clazz: EntityConstructor<E, EArgs>;
  textures: Texture[] = [];
  ready: Promise<void>;

  constructor(clazz: EntityConstructor<E, EArgs>, ...paths: string[]) {
    this.clazz = clazz;
    
    this.ready = (async () => {
      this.textures = await Promise.all(paths.map(async (path) => {
        return await Assets.load(path);
      }));
    })();
  }

  async _build(...args: EArgs): Promise<E> {
    await this.ready;
    return new this.clazz(...args, ...this.textures);
  }
}