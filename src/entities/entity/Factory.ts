import { Assets, Texture } from 'pixi.js';

import { Entity } from './Entity';
import { Class } from '../utils/Class';
import { Builder } from '../utils/Builder';

export abstract class Factory<E extends Entity, A extends any[]> extends Builder<E> {
  private entity: Class<E>;
  private textures: Texture[] = [];
  private ready: Promise<void>;

  protected constructor(entity: Class<E>, ...paths: string[]) {
    if (paths.length === 0)
        throw new Error("Trying to create a factory without a texture path");
    super();
    this.entity = entity;
    this.ready = (async () => {
      this.textures = await Promise.all(paths.map(async (path) => {
        return await Assets.load(path);
      }));
    })();
  }

  protected async buildEntity(...args: A) {
    await this.ready;
    return new this.entity(...args, ...this.textures);
  }
}