import { Application, TickerCallback } from "pixi.js";

import Object from "./Object";

export default class Ticker extends Object {
  constructor(app: Application) {
    super(app);
  }

  add(func: TickerCallback<any>) {
    this.app.ticker.add(func);
  }
}