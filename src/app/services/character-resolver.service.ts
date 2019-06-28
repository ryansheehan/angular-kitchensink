import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY, Subject } from 'rxjs';
import { map, switchMap, catchError, tap, first } from 'rxjs/operators';
import { ICharacter } from '../models/character.model';
import { CharacterCollectionService } from './character-collection.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService implements Resolve<ICharacter> {
  constructor(private characterCollectionService: CharacterCollectionService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): ICharacter | Observable<ICharacter> | Promise<ICharacter> {
    return of(route.paramMap.get('id')).pipe(
      map(id => parseInt(id, 10)),
      switchMap(id => this.characterCollectionService.get(id)),
      catchError(error => {
        console.error(error);
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
