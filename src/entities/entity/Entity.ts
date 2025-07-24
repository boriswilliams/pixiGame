import { Sprite, Texture } from 'pixi.js';

export type EntityConstructor<T extends Entity<Args>, Args extends any[]> = new (...args: [...Args, ...Texture[]]) => T;

export default abstract class Entity<_> {
  sprite!: Sprite;

  constructor(...textures: Texture[]) {
    if (textures.length === 0)
      throw new Error("Trying to create an object without a sprite");
    this.setSprite(textures[0]);
    for (let i = 1; i < textures.length; i++) {
      this.addSprite(textures[i]);
    }
  }

  makeSprite(texture: Texture) {
    const sprite = new Sprite(texture);
    sprite.scale.set(2);
    return sprite;
  }

  async setSprite(texture: Texture) {
    this.sprite = this.makeSprite(texture);
    this.sprite.anchor.set(0.5);
  }

  async addSprite(texture: Texture) {
    if (this.sprite === undefined)
      throw new Error("Trying to add a sprite when no main sprite is set");
    const child = this.makeSprite(texture);
    this.sprite.addChild(child);
    child.position.set(-this.sprite.width / 2, -this.sprite.height / 2);
  }
}