import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterCollectionService } from '../../services/character-collection.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() characters: Character[] = [];

  constructor() { }

  ngOnInit() {
  }

  trackByCharacter(index: number, item: Character) {
    return item.id;
  }
}
