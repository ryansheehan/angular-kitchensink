import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, startWith, tap, distinctUntilChanged, debounceTime, skip, filter, skipWhile } from 'rxjs/operators';

import { CharacterCollectionService } from '../../services/character-collection.service';
import { Character, CharacterTemplate, CharacterBackground, CharacterImage, ICharacter } from '../../models/character.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AppBarService } from 'src/app/services/app-bar.service';

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
    private characterCollectionService: CharacterCollectionService,
    private appBarService: AppBarService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    const character: Character = this.route.snapshot.data['character'];
    this.preview = character;

    this.characterForm = this.buildForm(character);

    this.characterForm.statusChanges.subscribe(status => this.appBarService.showNavigateBack.next(status === 'VALID'));

    this.characterForm.valueChanges.pipe(
      skipWhile(() => this.characterForm.status === 'INVALID'),

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
