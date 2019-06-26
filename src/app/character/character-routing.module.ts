import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersViewComponent } from './characters-view/characters-view.component';

const routes: Routes = [
  { path: '', component: CharactersViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
