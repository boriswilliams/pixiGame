import { Tickers } from '../../objects/Tickers';
import { Coords } from '../../utils/types';
import { Horizontal, HorizontalFactory } from './Projectile/Horizontal';

export class Light extends Horizontal<Light> {

}

export class LightFactory extends HorizontalFactory<Light, []> {
  constructor(tickers: Tickers) {
    super(Light, tickers, 50, '/assets/light.png');
  }

  async build(spawn: Coords, destination: Coords) {
    return await super.buildHorizontal(spawn, destination);
  }
}