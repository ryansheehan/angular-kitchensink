import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterTemplate, CharacterImage } from 'src/app/models/character.model';
import { CharacterCollectionService } from 'src/app/services/character-collection.service';

@Component({
  selector: 'quick-character',
  templateUrl: './quick-character.component.html',
  styleUrls: ['./quick-character.component.scss']
})
export class QuickCharacterComponent implements OnInit {

  @Output() newCharacter = new EventEmitter<CharacterTemplate>();

  newCharacterForm: FormGroup;
  imageOptions = Object.values(CharacterImage);

  constructor(private fb: FormBuilder, private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    this.newCharacterForm = this.fb.group({
      image: [this.characterCollectionService.defaultImage],
      name: ['', Validators.required]
    });

    this.newCharacterForm.get('image').valueChanges
      .subscribe(image => this.characterCollectionService.defaultImage = image);
  }

  addCharacter() {
    this.newCharacter.emit(this.newCharacterForm.value);
    const nameControl = this.newCharacterForm.get('name');
    nameControl.reset();
    nameControl.setErrors(null);
  }

}
