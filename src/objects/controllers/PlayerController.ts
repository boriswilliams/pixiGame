import { Application } from "pixi.js";

import { Mouse } from "../mouse/Mouse";
import { Keyboard } from "../keyboard/Keyboard";

import { Controller } from "./Controller";
import { Person } from "../../entities/person/Person";
import { Coords } from "../../utils/types";

export class PlayerController extends Controller {
  mouse: Mouse;
  keyboard: Keyboard;

  constructor(app: Application, mouse: Mouse, keyboard: Keyboard) {
    super(app);

    this.mouse = mouse;
    this.keyboard = keyboard;
  }

  assign(entity: Person) {
    this.mouse.addRotationTicker(entity);
    this.mouse.setHoldAction(entity, (mouseLocation: Coords) => entity.shoot(mouseLocation), () => entity.stopShooting());
    this.keyboard.addMovementTicker(entity, 6);
  }
    
  remove(entity: Person) {
    console.error(entity);
    // TODO
  }
}
