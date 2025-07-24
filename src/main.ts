import App from "./screen/app";

import { Spawner } from "./objects/Spawner";
import { Mouse } from "./objects/Mouse";
import { Keyboard } from "./objects/Keyboard";
import { Tickers } from "./objects/Tickers";

import { BoiBuilder } from "./entities/Boi";
import { DartRifleBuilder } from "./entities/guns/DartRifle";
import { DartBuilder } from "./entities/projectiles/Dart";

(async () => {
  const app = await App();

  const spawner = new Spawner(app);
  const mouse = new Mouse(app);
  const keyboard = new Keyboard(app);
  const tickers = new Tickers(app);

  const dartBuilder = new DartBuilder(tickers, spawner, 10, 1, 0.1);
  const dartRifleBuilder = new DartRifleBuilder(dartBuilder, spawner);
  const boiBuilder = new BoiBuilder();

  const boi = await boiBuilder.build();
  keyboard.moveWasd(boi, 3);
  mouse.lookAtMouse(boi);

  boi.giveGun(await dartRifleBuilder.build());
  mouse.setHoldAction(() => boi.shoot());
  
  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(boi);
  
})();
