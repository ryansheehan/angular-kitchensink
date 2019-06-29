import { Injectable } from '@angular/core';
import { BehaviorSubject, of, from, combineLatest } from 'rxjs';
import { Character, CharacterTemplate, ICharacter, CharacterImage } from '../models/character.model';
import { delay, mergeMap, first, map, share, findIndex, filter, toArray, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterCollectionService {

  defaultImage = CharacterImage.ROBOT;
  readonly cast = new BehaviorSubject<ICharacter[]>([]);

  constructor() {
  }

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
    // not really deprecated, only the pipe() version is deprecated
    // tslint:disable-next-line: deprecation
    const deletedList$ = combineLatest(
      of(character),
      this.cast,
      (item, list) => ({
        id: typeof item === 'object' ? item.id : item,
        list
      })
    ).pipe(
      first(),
      delay(100),
      map(({id, list}) => {
        const index = list.findIndex(l => l.id === id);
        if (index > -1) {
          return [...list.slice(0, index), ...list.slice(index + 1)];
        } else {
          throw new Error('Character not in cast');
        }
      }),
      share()
    );

    deletedList$.subscribe(cast => this.cast.next(cast));

    return deletedList$;
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
