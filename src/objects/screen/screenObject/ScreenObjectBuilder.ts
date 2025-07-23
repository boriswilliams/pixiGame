import { Assets } from 'pixi.js';

import { ObjectConstructor } from './ScreenObject';

export default abstract class ObjectBuilder {
  clazz: ObjectConstructor;
  paths: string[];

  constructor(clazz: ObjectConstructor, ...paths: string[]) {
    this.clazz = clazz;
    this.paths = paths;
  }

  async build() {
    const textures = await Promise.all(this.paths.map(async (path) => {
      return await Assets.load(path);
    }));

    return new this.clazz(textures[0], ...textures);
  }
}