import App from "./screen/app";

import Mouse from "./objects/Mouse";
import Keyboard from "./objects/Keyboard";

import BoiBuilder from "./entities/Boi";

(async () => {
  const app = await App();

  const mouse = new Mouse(app);
  const keyBoard = new Keyboard(app);

  const boiBuilder = new BoiBuilder();

  const boi = await boiBuilder.build();
  mouse.lookAtMouse(boi.sprite);
  keyBoard.moveWasd(boi.sprite, 5);
  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(boi.sprite);
  
})();
