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
    const gunLength = 15;
    const dart = await this.dartBuilder.build();
    const x = this.sprite.x + gunLength * Math.sin(this.sprite.rotation);
    const y = this.sprite.y - gunLength * Math.cos(this.sprite.rotation);
    dart.sprite.position.set(x, y);
    dart.sprite.rotation = this.sprite.rotation;
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
    return super._build(this.dartBuilder);
  }
}