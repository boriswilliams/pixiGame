import { Application } from "pixi.js";

import { Mouse } from "../Mouse";
import { Keyboard } from "../Keyboard";

import { Controller } from "./Controller";
import { Friendly } from "../../entities/person/Friendly";
import { Coords } from "../../utils/types";

export class PlayerController extends Controller {
  mouse: Mouse;
  keyboard: Keyboard;

  constructor(app: Application, mouse: Mouse, keyboard: Keyboard) {
    super(app);

    this.mouse = mouse;
    this.keyboard = keyboard;
  }

  assign(entity: Friendly) {
    this.mouse.lookAtMouse(entity);
    this.mouse.setHoldAction((mouseLocation: Coords) => entity.shoot(mouseLocation), () => entity.stopShooting());
    this.keyboard.moveWasdRelative(entity, 6);
  }
    
  remove(entity: Friendly) {
    console.error(entity);
    // TODO
  }
}
