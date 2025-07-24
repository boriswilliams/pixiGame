import App from "./screen/app";

import { Mouse } from "./objects/Mouse";
import { Keyboard } from "./objects/Keyboard";
import { Ticker } from "./objects/Ticker";

import { BoiBuilder } from "./entities/Boi";
import { DartRifleBuilder } from "./entities/guns/DartRifle";
import { DartBuilder } from "./entities/projectiles/Dart";

(async () => {
  const app = await App();

  const mouse = new Mouse(app);
  const keyboard = new Keyboard(app);
  const ticker = new Ticker(app);

  const dartBuilder = new DartBuilder(ticker, 10);
  const dartRifleBuilder = new DartRifleBuilder(dartBuilder, app);
  const boiBuilder = new BoiBuilder();

  const boi = await boiBuilder.build();
  keyboard.moveWasd(boi, 3);
  mouse.lookAtMouse(boi);

  boi.giveGun(await dartRifleBuilder.build());
  mouse.setHoldAction(() => boi.shoot());
  
  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(boi.sprite);
  
})();
