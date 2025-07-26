import { Application, Container } from "pixi.js";

import App from "./screen/app";;
import { RELATIVE_PLAYER_POSITION } from "./values";

import { Spawner } from "./objects/Spawner";
import { RelativeKeyboard } from "./objects/keyboard/Relative";
import { RelativeMouse } from "./objects/mouse/Relative";
import { AbsoluteMouse } from "./objects/mouse/Absolute";
import { AbsoluteKeyboard } from "./objects/keyboard/Absolute";
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
  
  enemy.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(enemy);
}

function makeWorld(app: Application, camera: Container) {
  const world = new Container();
  world.position.set(-app.screen.width / 2, -app.screen.height / 2);
  camera.addChild(world);
  return world;
}

(async () => {
  const app = await App();

  const camera = new Container();
  app.stage.addChild(camera);

  const world = makeWorld(app, camera);

  const pointerFactory = new PointerFactory();

  const spawner = new Spawner(world);
  // const relativeMouse = new RelativeMouse(app, await pointerFactory.build(), camera, world);
  // const relativeKeyboard = new RelativeKeyboard(app, world);
  const absoluteMouse = new AbsoluteMouse(app, await pointerFactory.build(), camera, world);
  const absoluteKeyboard = new AbsoluteKeyboard(app, world);
  const tickers = new Tickers(app);

  const playerController = new PlayerController(app, absoluteMouse, absoluteKeyboard);

  const friendlyFactory = new FriendlyFactory();

  // Get guns
  const dartFactory = new DartFactory(tickers, spawner, 1);
  const dartRifleFactory = new DartRifleFactory(dartFactory, spawner);

  const pelletFactory = new PelletFactory(tickers, spawner, 0.1);
  const bBGunFactory = new BBGunFactory(pelletFactory, spawner);

  const lightFactory = new LightFactory(tickers);
  const lightGunFactory = new LightGunFactory(lightFactory, spawner);

  // Prepare Player
  const player = await friendlyFactory.build();
  playerController.assign(player);
  player.giveGun(await bBGunFactory.build());
  
  player.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
  spawner.add(player);

  // Prepare enemies
  const enemyFactory = new EnemyFactory();
  for (let _ = 0; _ < 1; _++) {
    spawnEnemy(enemyFactory, app, spawner, dartRifleFactory);
    // spawnEnemy(enemyFactory, app, spawner, bBGunFactory);
    spawnEnemy(enemyFactory, app, spawner, lightGunFactory);
  }
})();
