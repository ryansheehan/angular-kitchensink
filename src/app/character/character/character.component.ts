import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { Character } from '../models/character.model';

@Component({
  selector: 'tyl-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('characterImage', {static: false}) characterImageRef: ElementRef;

  @Input() character: Character;
  @Output() delete = new EventEmitter<Character>();
  @Output() selected = new EventEmitter<Character>();

  imgSrc: string;
  loading = true;

  constructor() { }

  ngOnInit() {
    this.imgSrc = `https://robohash.org/${this.character.name}.png?size=200x200;bgset=bg0`;
  }

  ngAfterViewInit() {
    fromEvent(this.characterImageRef.nativeElement, 'load').subscribe(() => {
      this.loading = false;
    });
  }

  onDelete() {
    this.delete.emit(this.character);
  }
}
