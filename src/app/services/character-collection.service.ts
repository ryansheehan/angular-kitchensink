import { Injectable } from '@angular/core';
import { BehaviorSubject, of, from, combineLatest } from 'rxjs';
import { Character, CharacterTemplate, ICharacter } from '../models/character.model';
import { delay, mergeMap, first, map, share, findIndex, filter, toArray, tap } from 'rxjs/operators';

const testCharacters: Character[] = [
  new Character({name: 'Ryan'}),
  new Character({name: 'Jadrien'}),
  new Character({name: 'TJ'}),
  new Character({name: 'Adelynn'}),
  new Character({name: 'Avabella'}),
];

@Injectable({
  providedIn: 'root'
})
export class CharacterCollectionService {

  readonly cast = new BehaviorSubject<ICharacter[]>(testCharacters);

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

  remove(character: ICharacter | number) {
    const removed$ = of(character).pipe(
      delay(100),
      map(c => typeof c === 'object' ? c.id : c),
      map(id => {
        const cast = this.cast.value;
        const index = this.cast.value.findIndex(member => member.id === id);
        if (index > -1) {
          return [...cast.slice(0, index), ...cast.slice(index + 1)];
        } else {
          throw new Error('Not found, remove failed.');
        }
      }),
      share()
    );

    removed$.subscribe(cast => this.cast.next(cast));

    return removed$;
  }

  update(character: Character) {
    // not really deprecated, only the pipe() version is deprecated
    // tslint:disable-next-line: deprecation
    const editedList$ = combineLatest(of(character), this.cast, (item, list) => ({item, list})).pipe(
      first(),
      delay(100),
      map(({item, list}) => {
        const index = list.findIndex(l => l.id === item.id);
        if (index > -1) {
          return [...list.slice(0, index), item, ...list.slice(index + 1)];
        } else {
          throw new Error('Character not in cast');
        }
      }),
      share()
    );

    editedList$.subscribe(cast => this.cast.next(cast));

    return editedList$;
  }
}
