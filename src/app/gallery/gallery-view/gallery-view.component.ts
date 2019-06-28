import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICharacter, CharacterTemplate } from '../../models/character.model';
import { CharacterCollectionService } from '../../services/character-collection.service';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit {

  characters: ICharacter[] = [];

  constructor(private characterCollectionService: CharacterCollectionService, private router: Router) { }

  ngOnInit() {
    this.characterCollectionService.cast.subscribe(characters => this.characters = characters);
  }

  onNewCharacter(template: CharacterTemplate) {
    this.characterCollectionService.add(template);
  }

  onCharacterClicked({id}: ICharacter) {
    this.router.navigate(['/edit', id]);
  }
}
