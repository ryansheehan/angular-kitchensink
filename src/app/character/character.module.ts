import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatRippleModule,
  MatCardModule,
} from '@angular/material';

import { CharacterRoutingModule } from './character-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { CharactersViewComponent } from './characters-view/characters-view.component';

@NgModule({
  declarations: [
    GalleryComponent,
    CharacterFormComponent,
    CharacterCardComponent,
    CharactersViewComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatRippleModule,
  ]
})
export class CharacterModule { }
