import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, tap, distinctUntilChanged, debounceTime, skip } from 'rxjs/operators';

import { CharacterCollectionService } from '../../services/character-collection.service';
import { Character, CharacterTemplate, CharacterBackground, CharacterImage, ICharacter } from '../../models/character.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.scss']
})
export class EditCharacterComponent implements OnInit {

  characterForm: FormGroup;
  CharacterBackground = CharacterBackground;
  CharacterImage = CharacterImage;

  preview: Character;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private characterCollectionService: CharacterCollectionService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    const character: Character = this.route.snapshot.data['character'];
    this.preview = character;

    this.characterForm = this.buildForm(character);

    this.characterForm.valueChanges.pipe(
      map<Required<CharacterTemplate>, Character>(({name, image, background}) => new Character({
        name,
        image,
        background,
        id: character.id
      })),

      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe(updatedCharacter => {
      this.preview = updatedCharacter;
      this.characterCollectionService.update(updatedCharacter);
    });
  }

  private buildForm({name, background = CharacterBackground.NONE, image = CharacterImage.CAT}: CharacterTemplate) {
    const formGroup = this.fb.group({
      name: [name, Validators.required],
      image,
      background
    });
    return formGroup;
  }

}
