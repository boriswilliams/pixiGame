import App from "./screen/app";

import { Coords } from "./utils/types";

import { Spawner } from "./objects/Spawner";
import { Mouse } from "./objects/Mouse";
import { Keyboard } from "./objects/Keyboard";
import { Tickers } from "./objects/Tickers";

import { PlayerController } from "./objects/controllers/PlayerController";

import { BoiFactory } from "./entities/Boi";
import { DartRifleFactory } from "./entities/guns/DartRifle";
import { DartFactory } from "./entities/projectiles/Dart";
import { LightGunFactory } from "./entities/guns/LightGun";
import { LightFactory } from "./entities/projectiles/Light";
import { BBGunFactory } from "./entities/guns/BBGun";
import { PelletFactory } from "./entities/projectiles/Pellet";

(async () => {
  const app = await App();

  const spawner = new Spawner(app);
  const mouse = new Mouse(app);
  const keyboard = new Keyboard(app);
  const tickers = new Tickers(app);

  const playerController = new PlayerController(app, mouse, keyboard);

  const dartFactory = new DartFactory(tickers, spawner, 1);
  const dartRifleFactory = new DartRifleFactory(dartFactory, spawner);

  const pelletFactory = new PelletFactory(tickers, spawner, 0.1);
  const bBGunFactory = new BBGunFactory(pelletFactory, spawner);

  const lightFactory = new LightFactory(tickers);
  const lightGunFactory = new LightGunFactory(lightFactory, spawner);

  const boiFactory = new BoiFactory();

  const boi = await boiFactory.build();
  playerController.assign(boi);
  boi.giveGun(await dartRifleFactory.build());

  mouse.setHoldAction((mouseLocation: Coords) => boi.shoot(mouseLocation), () => boi.stopShooting());
  
  boi.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(boi);
  
})();
