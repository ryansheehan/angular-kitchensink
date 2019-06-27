import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterCollectionService } from '../character-collection.service';

@Component({
  selector: 'tyl-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  characters: Character[] = [];

  constructor(private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.characterCollectionService.cast.subscribe(characters => this.characters = characters);
  }

  trackByCharacter(index: number, item: Character) {
    return item.id;
  }

  removeCharacter(character: Character) {
    this.characterCollectionService.remove(character);
  }
}
