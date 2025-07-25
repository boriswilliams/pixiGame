import { Tickers } from '../../objects/Tickers';
import { Spawner } from '../../objects/Spawner';
import { Dropping, DroppingFactory } from './Projectile/Dropping';
import { Coords } from '../../utils/types';

export class Pellet extends Dropping<Pellet> {

}

export class PelletFactory extends DroppingFactory<Pellet, []> {
  constructor(tickers: Tickers, spawner: Spawner, deadtime: number) {
    super(Pellet, tickers, spawner, 10, deadtime, '/assets/pellet.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildDropping(spawn, destination);
  }
}