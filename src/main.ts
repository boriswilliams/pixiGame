import App from "./screen/app";

import BoiBuilder from "./objects/screenObjects/Boi";
import Mouse from "./objects/functionalObjects/mouse";
import Keyboard from "./objects/functionalObjects/keyboard";

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
