import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { RaceService } from '../race.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { CharacterClass } from '../models';
import { CharacterClass,
         GameCharacter,
         Race } from '../models';
import { NgForm,
         FormsModule,
         FormControl,
         Validators } from '@angular/forms';

@Component({
  selector: 'app-creation-perso',
  templateUrl: './creation-perso.component.html',
  styleUrls: ['./creation-perso.component.css']
})
export class CreationPersoComponent implements OnInit {

  gameCharacter: GameCharacter = new GameCharacter();
  classControl = new FormControl('', [Validators.required]);
  characterClass: CharacterClass;
  characterClasses: CharacterClass[];
  race: Race;
  sexes = [
    {value: 'femme', viewValue: 'femme'},
    {value: 'homme', viewValue: 'homme'}
  ];
  alliegeances = [
    'bien',
    'neutre',
    'mal'
  ];

  constructor(
    public userPageComponent: UserPageComponent,
    public gameCharacterService: GameCharacterService,
    public characterClassService: CharacterClassService,
    public raceService: RaceService
  ) { }

  ngOnInit() {
    this.characterClassService.getClassNameList().subscribe(
      classList => this.characterClasses = classList
    );
    console.log('ngOnInit()');
  }

  onSubmit() {
    this.gameCharacter.user = this.userPageComponent.getUser();
    this.gameCharacter.level = 1;
    this.gameCharacterService.createGameCharacter(this.gameCharacter).subscribe();
  }

  sexChanged(sexValue: string): void {
    if (typeof this.gameCharacter.sex === 'undefined') {
    } else {
      if (typeof this.gameCharacter.characterClass === 'undefined') {
      }
    }
    if (typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setHeight();
    }
  }

  classChanged(classValue: CharacterClass): void {
    if (typeof this.gameCharacter.sex !== 'undefined' && typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setHeight();
    }
  }

  setHeight() {
    let modifier = 0;
      let baseHeight = this.gameCharacter.characterClass.race.baseHeight;
      for (let i = 0; i < this.gameCharacter.characterClass.race.heightModifier.numberOfDices; i++) {
        modifier = modifier + ((Math.random() * this.gameCharacter.characterClass.race.heightModifier.numberOfSides) + 1);
      }
      if (this.gameCharacter.sex === 'femme') {
        baseHeight = baseHeight - this.gameCharacter.characterClass.race.heightSexModifier;
      }
      this.gameCharacter.height = +(baseHeight + modifier / 100).toFixed(2);
  }

}
