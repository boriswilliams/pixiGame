import { Person, PersonFactory } from './Person';

export class Enemy extends Person {

}

export class EnemyFactory extends PersonFactory {
  
  constructor() {
    super(Enemy, '/assets/enemy.png');
  }
}