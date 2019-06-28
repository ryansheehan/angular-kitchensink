import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppBarService {

  showNavigateBack = new BehaviorSubject(false);
  backRoute = '/gallery';

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(({urlAfterRedirects}: NavigationEnd) => urlAfterRedirects !== '/gallery' && urlAfterRedirects !== '/')
    ).subscribe(
      showNavigateBack => this.showNavigateBack.next(showNavigateBack)
    );
  }
}
