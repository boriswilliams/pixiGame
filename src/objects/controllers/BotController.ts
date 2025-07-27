import { Application, Ticker, TickerCallback } from "pixi.js";

import { Controller } from "./Controller";
import { Person } from "../../entities/person/Person";
import { angleCoords, randomAngle, randomBool, minMax } from "../../utils/math";

export class BotController extends Controller {
  private func: TickerCallback<any> | undefined;
  private movementDirection = randomAngle();
  private minDistance = 50;
  private maxDistance = 300;
  private curDistance: number | undefined;
  private distanceVariance = 10;

  constructor(app: Application) {
    super(app);
  }

  assign(person: Person) {
    if (this.func) {
      throw new Error("Controller already in use");
    }
    this.func = (time: Ticker) => {
      if (randomBool(0.005))
        this.movementDirection = randomAngle();
      const speed = 1 * time.deltaTime;
      const mxy = angleCoords(this.movementDirection);
      person.sprite.x += mxy.x * speed;
      person.sprite.y += mxy.y * speed;

      if (randomBool(0.005)) {
        if (this.isShooting) {
          person.stopShooting()
          this.curDistance = undefined;
        } else {
          this.curDistance = Math.random() * (this.maxDistance - this.minDistance) + this.minDistance;
        }
        this.isShooting = !this.isShooting;
      }
      if (randomBool(0.010))
        person.sprite.rotation = randomAngle();
      const rxy = angleCoords(person.sprite.rotation);
      if (this.isShooting)
        this.curDistance = minMax(this.minDistance, this.curDistance! + (Math.random() - 0.5) * 2 * this.distanceVariance, this.maxDistance);
        person.shoot({
          x: person.sprite.x + rxy.x * this.curDistance!,
          y: person.sprite.y + rxy.y * this.curDistance!
        });
    };
    this.app.ticker.add(this.func);
  }

  remove() {
    if (!this.func) {
      throw new Error("Trying to remove controller that doesn't exist");
    }
    this.app.ticker.remove(this.func);
    this.func = undefined;
  }
}
