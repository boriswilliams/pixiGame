import { Person, PersonFactory } from './Person';

export class Friendly extends Person {

}

export class FriendlyFactory extends PersonFactory {
  
  constructor() {
    super(Friendly, '/assets/player.png');
  }
}