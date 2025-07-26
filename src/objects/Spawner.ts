import { Container } from "pixi.js";

import { Entity } from "../entities/entity/Entity";

export class Spawner {
  container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  add(entity: Entity) {
    this.container.addChild(entity.sprite);
  }

  remove(entity: Entity) {
    this.container.removeChild(entity.sprite);
    entity.sprite.destroy();
  }
}