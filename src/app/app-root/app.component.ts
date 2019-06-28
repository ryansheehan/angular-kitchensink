import { Component, ViewChild, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSlideToggle } from '@angular/material';
import { AppBarService } from '../services/app-bar.service';

@Component({
  selector: 'tyl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('darkModeToggle', { static: true }) darkModeToggleRef: MatSlideToggle;

  title = 'Character Gallery';
  currentTheme = 'dark-theme';

  constructor(private overlayContainer: OverlayContainer, public appBarService: AppBarService) { }

  ngOnInit() {
    this.darkModeToggleRef.checked = this.currentTheme === 'dark-theme';

    this.darkModeToggleRef.change.pipe(
      map(({ checked }) => checked ? 'dark-theme' : 'light-theme'),
      tap(newThemeClass => {
        const { classList: overLayClasses } = this.overlayContainer.getContainerElement();
        const themeClassesToRemove = Array.from(overLayClasses).filter(className => className.includes('-theme'));
        if (themeClassesToRemove.length) {
          overLayClasses.remove(...themeClassesToRemove);
        }
        overLayClasses.add(newThemeClass);
      })
    ).subscribe(theme => this.currentTheme = theme);
  }
}
