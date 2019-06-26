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
import { ICharacter } from '../models/character.model';

@Component({
  selector: 'tyl-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('characterImage', {static: false}) characterImageRef: ElementRef;

  @Input() character: ICharacter;
  @Output() delete = new EventEmitter<ICharacter>();
  @Output() selected = new EventEmitter<ICharacter>();

  imgSrc: string;
  loading = true;

  constructor() { }

  ngOnInit() {
    // characters found at https://robohash.org/
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
