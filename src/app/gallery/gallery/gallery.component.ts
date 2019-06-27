import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() characters: Character[] = [];
  @Output() characterClicked = new EventEmitter<Character>();

  isClickable = true;

  constructor() { }

  ngOnInit() {
    this.isClickable= !!this.characterClicked.observers.length;
  }

  trackByCharacter(index: number, item: Character) {
    return item.id;
  }

  onClick(character: Character) {
    this.characterClicked.emit(character);
  }
}
