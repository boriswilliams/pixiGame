import { Texture } from 'pixi.js';

import Entity from './entity/Entity';
import EntityBuilder from './entity/EntityBuilder';

export class Boi extends Entity {
  constructor(...textures: Texture[]) {
    super(...textures);
  }
}

export default class BoiBuilder extends EntityBuilder {
  constructor() {
    super(Boi, '/assets/boi.png', '/assets/gun.png');
  }
}