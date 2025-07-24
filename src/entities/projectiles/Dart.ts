import { Projectile } from './Projectile';
import { ProjectileBuilder } from './Projectile';
import { Ticker } from '../../objects/Ticker';

export class Dart extends Projectile {

}

export class DartBuilder extends ProjectileBuilder<Dart> {

  constructor(ticker: Ticker, speed: number) {
    super(Dart, ticker, speed, '/assets/dart.png');
  }
}