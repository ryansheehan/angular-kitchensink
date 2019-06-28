import { Injectable } from '@angular/core';
import { BehaviorSubject, of, from, combineLatest } from 'rxjs';
import { Character, CharacterTemplate } from '../models/character.model';
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

  update(character: Character) {
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
