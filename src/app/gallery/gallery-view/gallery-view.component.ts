import { Component, OnInit } from '@angular/core';
import { Character, CharacterTemplate } from '../../models/character.model';
import { CharacterCollectionService } from '../../services/character-collection.service';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit {

  characters: Character[] = [];

  constructor(private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.characterCollectionService.cast.subscribe(characters => this.characters = characters);
  }

  onNewCharacter(template: CharacterTemplate) {
    this.characterCollectionService.add(template);
  }
}
