import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ICharacter } from '../../models/character.model';

@Component({
  selector: 'character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, AfterViewInit {
  @ViewChild('characterImage', {static: false}) characterImageRef: ElementRef<HTMLImageElement>;

  @Input() character: ICharacter;
  @Input() imageHoverZoom = true;

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
