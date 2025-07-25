import App from "./screen/app";

import { Coords } from "./utils/types";

import { Spawner } from "./objects/Spawner";
import { Mouse } from "./objects/Mouse";
import { Keyboard } from "./objects/Keyboard";
import { Tickers } from "./objects/Tickers";

import { PlayerController } from "./objects/controllers/PlayerController";

import { FriendlyFactory } from "./entities/person/Friendly";
import { DartRifleFactory } from "./entities/guns/DartRifle";
import { DartFactory } from "./entities/projectiles/Dart";
import { LightGunFactory } from "./entities/guns/LightGun";
import { LightFactory } from "./entities/projectiles/Light";
import { BBGunFactory } from "./entities/guns/BBGun";
import { PelletFactory } from "./entities/projectiles/Pellet";
import { BotController } from "./objects/controllers/BotController";
import { Application } from "pixi.js";
import { GunFactory } from "./entities/guns/Gun";
import { EnemyFactory } from "./entities/person/Enemy";

async function spawnEnemy(factory: EnemyFactory, app: Application, spawner: Spawner, gunFactory: GunFactory<any, any>) {
  const enemy = await factory.build();
  enemy.addController(new BotController(app));
  enemy.giveGun(await gunFactory.build());
  
  enemy.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(enemy);
}

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

  const friendlyFactory = new FriendlyFactory();

  const player = await friendlyFactory.build();
  playerController.assign(player);
  player.giveGun(await dartRifleFactory.build());
  
  player.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(player);

  const enemyFactory = new EnemyFactory();
  for (let _ = 0; _ < 10; _++) {
    spawnEnemy(enemyFactory, app, spawner, dartRifleFactory);
    spawnEnemy(enemyFactory, app, spawner, bBGunFactory);
    spawnEnemy(enemyFactory, app, spawner, lightGunFactory);
  }
})();
