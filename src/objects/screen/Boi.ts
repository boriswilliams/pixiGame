import { Texture } from 'pixi.js';

import Object from './screenObject/ScreenObject';
import ObjectBuilder from './screenObject/ScreenObjectBuilder';

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