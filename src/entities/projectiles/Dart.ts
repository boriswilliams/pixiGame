import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingBuilder } from './Projectile/Dropping';

export class Dart extends Dropping {

}

export class DartBuilder extends DroppingBuilder<Dart> {

  constructor(tickers: Tickers, spawner: Spawner, lifetime: number, deadtime: number) {
    super(Dart, tickers, spawner, 10, lifetime, deadtime, '/assets/dart.png');
  }
}