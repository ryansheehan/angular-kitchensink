import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCharacterComponent } from './edit-character/edit-character.component';

const routes: Routes = [
  { path: '', component: EditCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
