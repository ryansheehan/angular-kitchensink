import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSlideToggle } from '@angular/material';

@Component({
  selector: 'tyl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('darkModeToggle', {static: true}) darkModeToggleRef: MatSlideToggle;

  title = 'Character Gallery';
  currentTheme = 'light-theme';

  ngOnInit() {
    this.darkModeToggleRef.change.pipe(
      map(({checked}) => checked ? 'dark-theme' : 'light-theme')
    ).subscribe(theme => this.currentTheme = theme);
  }
}
