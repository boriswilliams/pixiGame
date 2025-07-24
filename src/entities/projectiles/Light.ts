import { Tickers } from '../../objects/Tickers';
import { Horizontal, HorizontalBuilder } from './Projectile/Horizontal';

export class Light extends Horizontal {

}

export class LightBuilder extends HorizontalBuilder<Light> {

  constructor(tickers: Tickers) {
    super(Light, tickers, 50, '/assets/light.png');
  }
}