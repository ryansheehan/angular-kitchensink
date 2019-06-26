import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../models/character.model';
import { CharacterCollectionService } from '../character-collection.service';

@Component({
  selector: 'tyl-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  characters: ICharacter[] = [];

  constructor(private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.characterCollectionService.cast.subscribe(characters => this.characters = characters);
  }

  trackByCharacter(index: number, item: ICharacter) {
    return item.id;
  }

  removeCharacter(character: ICharacter) {
    this.characterCollectionService.remove(character);
  }
}
