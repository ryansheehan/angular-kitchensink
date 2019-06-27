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
  selector: 'tyl-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, AfterViewInit {
  @ViewChild('characterImage', {static: false}) characterImageRef: ElementRef<HTMLImageElement>;

  @Input() character: Character;
  @Output() selected = new EventEmitter<Character>();

  imgSrc: string;
  loading = true;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.characterImageRef.nativeElement, 'load').subscribe(() => {
      this.loading = false;
    });
  }
}
