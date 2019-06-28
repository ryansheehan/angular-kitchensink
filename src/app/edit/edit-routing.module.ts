import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCharacterComponent } from './edit-character/edit-character.component';
import { CharacterResolverService } from '../services/character-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: EditCharacterComponent,
    resolve: {
      character: CharacterResolverService
    },
  },
  {
    path: '**',
    redirectTo: '..',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
