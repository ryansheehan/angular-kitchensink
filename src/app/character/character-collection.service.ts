import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character, CharacterTemplate } from './models/character.model';

const testCharacters: Character[] = [
  new Character({name: 'Ryan'}),
  new Character({name: 'Derek'}),
  new Character({name: 'Sami'}),
  new Character({name: 'Chris'}),
  new Character({name: 'Mark'}),
  new Character({name: 'Rick'}),
  new Character({name: 'Ethan'}),
];

@Injectable({
  providedIn: 'root'
})
export class CharacterCollectionService {

  readonly cast = new BehaviorSubject<Character[]>(testCharacters);

  constructor() { }

  add(character: CharacterTemplate) {
    const newCharacter = new Character(character);
    this.cast.next([newCharacter, ...this.cast.value]);
    return newCharacter;
  }

  remove(character: Character | number) {
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
