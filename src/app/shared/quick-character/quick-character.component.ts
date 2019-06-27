import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterTemplate } from 'src/app/models/character.model';

@Component({
  selector: 'quick-character',
  templateUrl: './quick-character.component.html',
  styleUrls: ['./quick-character.component.scss']
})
export class QuickCharacterComponent implements OnInit {

  @Output() newCharacter = new EventEmitter<CharacterTemplate>();

  newCharacterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.newCharacterForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addCharacter() {
    this.newCharacter.emit(this.newCharacterForm.value);
    this.newCharacterForm.reset();
    this.newCharacterForm.get('name').setErrors(null);
  }

}
