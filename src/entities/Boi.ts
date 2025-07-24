import { Texture } from 'pixi.js';

import Entity from './entity/Entity';
import EntityBuilder from './entity/EntityBuilder';
import DartBuilder from './Dart';

export class Boi extends Entity<[DartBuilder]> {
  dartBuilder: DartBuilder;

  constructor(dartBuilder: DartBuilder, ...textures: Texture[]) {
    super(...textures);
    this.dartBuilder = dartBuilder;
  }

  async shoot() {
    const dart = await this.dartBuilder.build();
    dart.sprite.position.set(this.sprite.x, this.sprite.y);
    return dart.sprite;
  }
}

export default class BoiBuilder extends EntityBuilder<Boi, [DartBuilder]> {
  dartBuilder: DartBuilder;
  
  constructor(dartBuilder: DartBuilder) {
    super(Boi, '/assets/boi.png', '/assets/gun.png');
    this.dartBuilder = dartBuilder;
  }

  build() {
    return super.build(this.dartBuilder);
  }
}