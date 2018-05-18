import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { RaceService } from '../race.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { TestBed } from '@angular/core/testing';
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
    this.gameCharacter.level = 1;
    this.gameCharacter.strength = this.setAbility();
    this.gameCharacter.dexterity = this.setAbility();
    this.gameCharacter.constitution = this.setAbility();
    this.gameCharacter.intelligence = this.setAbility();
    this.gameCharacter.wisdom = this.setAbility();
    this.gameCharacter.charism = this.setAbility();
  }

  onSubmit(): void {
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
    if (typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setAge();
    }
  }

  setAbility (): number {
    return 8 + this.rollingDice(1, 10);
  }

  setAge(): void {
    this.gameCharacter.age = +(this.gameCharacter.characterClass.startingAge + this.rollingDice(
      this.gameCharacter.characterClass.startingAgeModifier.numberOfDices,
      this.gameCharacter.characterClass.startingAgeModifier.numberOfSides
    ));
  }

  setHeight(): void {
    this.gameCharacter.height = +(this. gameCharacter.characterClass.race.baseHeight + this.rollingDice(
      this.gameCharacter.characterClass.race.heightModifier.numberOfDices,
      this.gameCharacter.characterClass.race.heightModifier.numberOfSides
    ) / 100).toFixed(2);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.height = +(this.gameCharacter.height - this.gameCharacter.characterClass.race.heightSexModifier).toFixed(2);
    }
  }

  rollingDice(dice: number, sides: number): number {
    let result = 0;
    for (let i = 0; i < dice; i++) {
      result = result + +(Math.trunc((Math.random() * sides)) + 1).toFixed(0);
    }
    this.test = result;
    return result;
  }

}
