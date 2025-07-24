import { Tickers } from '../../objects/Tickers';
import { Horizontal, HorizontalFactory } from './Projectile/Horizontal';

export class Light extends Horizontal<Light> {

}

export class LightFactory extends HorizontalFactory<Light, []> {
  constructor(tickers: Tickers) {
    super(Light, tickers, 50, '/assets/light.png');
  }

  async build() {
    return await super.buildHorizontal();
  }
}