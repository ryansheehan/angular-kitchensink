import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICharacter } from '../../models/character.model';
import { CharacterCollectionService } from 'src/app/services/character-collection.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() characters: ICharacter[] = [];
  @Output() characterClicked = new EventEmitter<ICharacter>();

  disableClickable = true;

  constructor(private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.disableClickable = !this.characterClicked.observers.length;
  }

  trackByCharacter(index: number, item: ICharacter) {
    return item.id;
  }

  onClick(character: ICharacter) {
    this.characterClicked.emit(character);
  }

  delete(character: ICharacter) {
    this.characterCollectionService.remove(character);
  }
}
