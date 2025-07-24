import { Projectile } from './Projectile';
import { ProjectileBuilder } from './Projectile';
import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';

export class Dart extends Projectile {

}

export class DartBuilder extends ProjectileBuilder<Dart> {

  constructor(tickers: Tickers, spawner: Spawner, speed: number, lifetime: number, deadtime: number) {
    super(Dart, tickers, spawner, speed, lifetime, deadtime, '/assets/dart.png');
  }
}