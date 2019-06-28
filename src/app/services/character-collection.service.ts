import { Injectable } from '@angular/core';
import { BehaviorSubject, of, from, combineLatest } from 'rxjs';
import { Character, CharacterTemplate } from '../models/character.model';
import { delay, mergeMap, first, map, share, findIndex, filter, toArray, tap } from 'rxjs/operators';

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

  get(id: number) {
    return this.cast.pipe(
      delay(100),
      mergeMap(cast => from(cast).pipe(
        first(character => character.id === id),
      )),
      first()
    );
  }

  add(character: CharacterTemplate) {
    const newCharacter$ = of(character).pipe(
      delay(100),
      map(template => new Character(template)),
      first(),
      share()
    );

    newCharacter$.subscribe(
      newCharacter => this.cast.next([newCharacter, ...this.cast.value])
    );

    return newCharacter$;
  }

  remove(character: Character | number) {
    const removed$ = of(character).pipe(
      delay(100),
      map(c => typeof c === 'object' ? c.id : c),
      mergeMap(id => this.cast.pipe(
        map(castList => {
          const index = castList.findIndex(member => member.id === id);
          if (index > -1) {
            return {
              cast: [...castList.slice(0, index), ...castList.slice(index + 1)],
              removed: castList[index]
            };
          } else {
            throw new Error('Not found');
          }
        })
      )),
      share()
    );

    removed$.subscribe(({cast}) => this.cast.next(cast));

    return removed$;
  }
}
