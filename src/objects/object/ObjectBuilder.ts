import { Application, Assets } from 'pixi.js';

import { ObjectConstructor } from './Object';

export default abstract class ObjectBuilder {
  app: Application;
  clazz: ObjectConstructor;
  paths: string[];

  constructor(app: Application, clazz: ObjectConstructor, ...paths: string[]) {
    this.app = app;
    this.clazz = clazz;
    this.paths = paths;
  }

  async build() {
    const textures = await Promise.all(this.paths.map(async (path) => {
      return await Assets.load(path);
    }));

    return new this.clazz(this.app, textures[0], ...textures);
  }
}