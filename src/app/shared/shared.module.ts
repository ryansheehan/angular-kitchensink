import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule,
  MatRippleModule,
  MatRadioModule,
} from '@angular/material';

const materialModules = [
  MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatRippleModule,
    MatRadioModule,
];

import { QuickCharacterComponent } from './quick-character/quick-character.component';
import { CharacterCardComponent } from './character-card/character-card.component';

@NgModule({
  declarations: [
    QuickCharacterComponent,
    CharacterCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    ReactiveFormsModule,
    QuickCharacterComponent,
    CharacterCardComponent
  ]
})
export class SharedModule { }
