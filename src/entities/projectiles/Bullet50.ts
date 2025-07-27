import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';

export class Bullet50 extends Dropping<Bullet50> {

}

export class Bullet50Factory extends DroppingFactory<Bullet50, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Bullet50, tickers, spawner,
      10, // speed
      deadtime, '/assets/50cal.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}