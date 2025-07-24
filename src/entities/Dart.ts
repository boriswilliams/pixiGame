import { Texture } from 'pixi.js';

import Entity from './entity/Entity';
import EntityBuilder from './entity/EntityBuilder';
import Ticker from '../objects/Ticker';

type AddMovementTicker = (x: Dart) => void;

export class Dart extends Entity<[AddMovementTicker]> {

  constructor(addMovementTicker: AddMovementTicker, ...textures: Texture[]) {
    super(...textures);
    addMovementTicker(this);
  }
}

export default class DartBuilder extends EntityBuilder<Dart, [AddMovementTicker]> {
  addMovementTicker: AddMovementTicker;

  constructor(ticker: Ticker, speed: number) {
    super(Dart, '/assets/dart.png');
    this.addMovementTicker = (dart: Dart) => {
      ticker.add((time) => {
        const travel = time.deltaTime * speed;
        dart.sprite.y -= travel * Math.cos(dart.sprite.rotation);
        dart.sprite.x += travel * Math.sin(dart.sprite.rotation);
      });
    }
  }

  build() {
    return super._build(this.addMovementTicker);
  }
}