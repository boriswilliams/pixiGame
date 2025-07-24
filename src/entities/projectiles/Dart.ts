import { Texture } from 'pixi.js';

import { Projectile } from './Projectile';
import { ProjectileBuilder } from './Projectile';
import { Ticker } from '../../objects/Ticker';

type AddMovementTicker = (x: Dart) => void;

export class Dart extends Projectile {

  constructor(addMovementTicker: AddMovementTicker, ...textures: Texture[]) {
    super(addMovementTicker, ...textures);
  }
}

export class DartBuilder extends ProjectileBuilder<Dart> {

  constructor(ticker: Ticker, speed: number) {
    super(Dart, ticker, speed, '/assets/dart.png');
  }

  build() {
    return super.build();
  }
}