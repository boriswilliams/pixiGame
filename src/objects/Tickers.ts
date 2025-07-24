import { Application, TickerCallback } from "pixi.js";

import { Object } from "./Object";

export class Tickers extends Object {
  constructor(app: Application) {
    super(app);
  }

  add(func: TickerCallback<any>) {
    this.app.ticker.add(func);
  }

  remove(func: TickerCallback<any>) {
    this.app.ticker.remove(func);
  }
}