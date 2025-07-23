import App from "./screen/app";

import BoiBuilder from "./objects/boi";

(async () => {
  const app = await App();

  const boiBuilder = new BoiBuilder(app);
  const boi = await boiBuilder.build();

  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  app.stage.addChild(boi.sprite);
})();
