import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICharacter } from '../../models/character.model';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() characters: ICharacter[] = [];
  @Output() characterClicked = new EventEmitter<ICharacter>();

  isClickable = true;

  constructor() { }

  ngOnInit() {
    this.isClickable = !!this.characterClicked.observers.length;
  }

  trackByCharacter(index: number, item: ICharacter) {
    return item.id;
  }

  onClick(character: ICharacter) {
    this.characterClicked.emit(character);
  }
}
