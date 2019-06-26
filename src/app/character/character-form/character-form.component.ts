import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterCollectionService } from '../character-collection.service';

@Component({
  selector: 'tyl-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  newCharacterForm: FormGroup;

  constructor(private fb: FormBuilder, private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.newCharacterForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addCharacter() {
    this.characterCollectionService.add(this.newCharacterForm.value);
    this.newCharacterForm.reset();
    this.newCharacterForm.get('name').setErrors(null);
  }
}
