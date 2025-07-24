import App from "./screen/app";

import Mouse from "./objects/Mouse";
import Keyboard from "./objects/Keyboard";

import BoiBuilder from "./entities/Boi";
import DartBuilder from "./entities/Dart";

(async () => {
  const app = await App();

  const mouse = new Mouse(app);
  const keyBoard = new Keyboard(app);

  const dartBuilder = new DartBuilder();
  const boiBuilder = new BoiBuilder(dartBuilder);

  const boi = await boiBuilder.build();
  mouse.lookAtMouse(boi.sprite);
  mouse.setHoldAction(async () => app.stage.addChild(await boi.shoot()));
  keyBoard.moveWasd(boi.sprite, 5);
  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(boi.sprite);
  
})();
