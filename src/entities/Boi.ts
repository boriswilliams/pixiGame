import { Texture } from 'pixi.js';

import Object from './entity/Entity';
import ObjectBuilder from './entity/EntityBuilder';

export class Boi extends Object {
  constructor(...textures: Texture[]) {
    super(...textures);
  }
}

export default class BoiBuilder extends ObjectBuilder {
  constructor() {
    super(Boi, '/assets/boi.png', '/assets/gun.png');
  }
}