import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICharacter, CharacterTemplate } from './models/character.model';

const idGen = (function*() {
  for (let i = 0;; i++) { yield i; }
})();

const testCharacters: ICharacter[] = [
  { id: idGen.next().value, name: 'Ryan' },
  { id: idGen.next().value, name: 'Derek' },
  { id: idGen.next().value, name: 'Sami' },
  { id: idGen.next().value, name: 'Chris' },
  { id: idGen.next().value, name: 'Mark' },
  { id: idGen.next().value, name: 'Rick' },
  { id: idGen.next().value, name: 'Ethan' },
];

@Injectable({
  providedIn: 'root'
})
export class CharacterCollectionService {

  readonly cast = new BehaviorSubject<ICharacter[]>(testCharacters);

  constructor() { }

  add(character: CharacterTemplate) {
    const newCharacter: ICharacter = {...character, id: idGen.next().value};
    this.cast.next([newCharacter, ...this.cast.value]);
    return newCharacter;
  }

  remove(character: ICharacter | number) {
    const id = typeof character === 'object' ? character.id : character;
    const cast = this.cast.value;
    const index = cast.findIndex(c => c.id === id);
    if (index > -1) {
      const removed = cast[index];
      this.cast.next([
        ...cast.slice(0, index),
        ...cast.slice(index + 1)
      ]);
      return removed;
    }
    return null;
  }
}
