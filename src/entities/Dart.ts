import { Texture } from 'pixi.js';

import Entity from './entity/Entity';
import EntityBuilder from './entity/EntityBuilder';

export class Dart extends Entity<[]> {
  constructor(...textures: Texture[]) {
    super(...textures);
  }
}

export default class DartBuilder extends EntityBuilder<Dart, []> {
  constructor() {
    super(Dart, '/assets/dart.png');
  }
}