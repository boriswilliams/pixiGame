import { Application, Container } from "pixi.js";

import App from "./screen/app";;

import { Spawner } from "./objects/Spawner";
import { Tickers } from "./objects/Tickers";

import { PlayerController } from "./objects/controllers/PlayerController";
import { BotController } from "./objects/controllers/BotController";

import { FriendlyFactory } from "./entities/person/Friendly";
import { DartRifleFactory } from "./entities/guns/DartRifle";
import { DartFactory } from "./entities/projectiles/Dart";
import { LightGunFactory } from "./entities/guns/LightGun";
import { LightFactory } from "./entities/projectiles/Light";
import { BBGunFactory } from "./entities/guns/BBGun";
import { PelletFactory } from "./entities/projectiles/Pellet";
import { GunFactory } from "./entities/guns/Gun";
import { EnemyFactory } from "./entities/person/Enemy";
import { PointerFactory } from "./entities/pointer"

async function spawnEnemy(factory: EnemyFactory, app: Application, spawner: Spawner, gunFactory: GunFactory<any, any>) {
  const enemy = await factory.build();
  enemy.addController(new BotController(app));
  enemy.giveGun(await gunFactory.build());
  
  spawner.add(enemy);
}

(async () => {
  // Setup app
  const app = await App();

  const camera = new Container();
  app.stage.addChild(camera);
  camera.position.set(app.screen.width / 2, app.screen.height / 2);

  const world = new Container();
  camera.addChild(world);

  // Setup objects
  const spawner = new Spawner(world);
  const tickers = new Tickers(app);

  // Get guns
  const dartFactory = new DartFactory(tickers, spawner, 1);
  const dartRifleFactory = new DartRifleFactory(dartFactory, spawner);

  const pelletFactory = new PelletFactory(tickers, spawner, 0.1);
  const bBGunFactory = new BBGunFactory(pelletFactory, spawner);

  const lightFactory = new LightFactory(tickers);
  const lightGunFactory = new LightGunFactory(lightFactory, spawner);

  // Prepare Player
  const pointerFactory = new PointerFactory();
  const friendlyFactory = new FriendlyFactory();
  
  const playerController = new PlayerController(app, camera, world, tickers, await pointerFactory.build());
  const player = await friendlyFactory.build();
  player.giveGun(await bBGunFactory.build());
  playerController.assign(player);
  
  player.sprite.position.set(0, 0);
  spawner.add(player);

  // Prepare enemies
  const enemyFactory = new EnemyFactory();
  for (let _ = 0; _ < 1; _++) {
    spawnEnemy(enemyFactory, app, spawner, dartRifleFactory);
    // spawnEnemy(enemyFactory, app, spawner, bBGunFactory);
    spawnEnemy(enemyFactory, app, spawner, lightGunFactory);
  }
})();
