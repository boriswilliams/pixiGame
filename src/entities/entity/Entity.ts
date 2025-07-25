import { Sprite, Texture } from 'pixi.js';

import { SCALE } from '../../values';
import { Controller } from '../../objects/controllers/Controller';

export abstract class Entity {
  sprite!: Sprite;
  controller: Controller | undefined;

  protected constructor(...textures: Texture[]) {
    if (textures.length === 0)
      throw new Error("Trying to create an object without a sprite");
    this.setSprite(textures[0]);
    for (let i = 1; i < textures.length; i++) {
      this.addTexture(textures[i]);
    }
  }

  private makeSprite(texture: Texture) {
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    return sprite;
  }

  protected async setSprite(texture: Texture) {
    this.sprite = this.makeSprite(texture);
    this.sprite.scale.set(SCALE);
  }

  protected addSprite(childSprite: Sprite) {
    this.sprite.addChild(childSprite);
    childSprite.scale.set(1);
  }

  protected async addTexture(texture: Texture) {
    if (this.sprite === undefined)
      throw new Error("Trying to add a sprite when no main sprite is set");
    const child = this.makeSprite(texture);
    this.addSprite(child);
  }

  addController(controller: Controller) {
    if (this.controller) {
      throw new Error("Controller already exists");
    }
    controller.assign(this);
    this.controller = controller;
  }

  removeController() {
    if (!this.controller) {
      throw new Error("Trying to remove controller that doesn't exist");
    }
    this.controller.remove(this);
    this.controller = undefined;
  }
}