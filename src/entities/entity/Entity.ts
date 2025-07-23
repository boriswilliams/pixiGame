import { Sprite, Texture } from 'pixi.js';

export type EntityConstructor = new (...textures: Texture[]) => Entity;

export default abstract class Entity {
  sprite!: Sprite;

  constructor(...textures: Texture[]) {
    if (textures.length === 0)
      throw new Error("Trying to create an object without a sprite");
    this.setSprite(textures[0]);
    for (let i = 1; i < textures.length; i++) {
      this.addSprite(textures[i]);
    }
  }

  async setSprite(texture: Texture) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
  }

  async addSprite(texture: Texture) {
    if (this.sprite === undefined)
      throw new Error("Trying to add a sprite when no main sprite is set");
    const child = new Sprite(texture);
    this.sprite.addChild(child);
    child.position.set(-this.sprite.width / 2, -this.sprite.height / 2);
  }
}