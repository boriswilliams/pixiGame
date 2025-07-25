import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';

export class Dart extends Dropping<Dart> {

}

export class DartFactory extends DroppingFactory<Dart, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Dart, tickers, spawner, 5, deadtime, '/assets/dart.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}