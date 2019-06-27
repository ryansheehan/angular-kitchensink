import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditCharacterComponent } from './edit-character/edit-character.component';

@NgModule({
  declarations: [EditCharacterComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    SharedModule,
  ]
})
export class EditModule { }
