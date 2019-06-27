import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'tyl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('themeSelector', {static: true}) themeSelectRef: MatSelect;

  title = 'Character Gallery';
  themes = [
    'light',
    'dark'
  ];
  currentTheme = 'light-theme';

  ngOnInit() {
    this.themeSelectRef.valueChange.pipe(
      map(theme => `${theme}-theme`)
    ).subscribe(theme => this.currentTheme = theme);
  }
}
