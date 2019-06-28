import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CharacterCollectionService } from '../../services/character-collection.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.scss']
})
export class EditCharacterComponent implements OnInit {

  constructor(public route: ActivatedRoute, private characterCollectionService: CharacterCollectionService) { }

  character: Character;

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.character = this.route.snapshot.data['character'] as Character;
  }

}
