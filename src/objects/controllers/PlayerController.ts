import { Application } from "pixi.js";

import { Mouse } from "../Mouse";
import { Keyboard } from "../Keyboard";

import { Controller } from "./Controller";
import { Entity } from "../../entities/entity/Entity";

export class PlayerController extends Controller {
  mouse: Mouse;
  keyboard: Keyboard;

  constructor(app: Application, mouse: Mouse, keyboard: Keyboard) {
    super(app);

    this.mouse = mouse;
    this.keyboard = keyboard;
  }

  assign(entity: Entity) {
    this.mouse.lookAtMouse(entity);
    this.keyboard.moveWasdRelative(entity, 6);
  }
}
