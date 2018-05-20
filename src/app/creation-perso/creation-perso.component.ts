import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { RaceService } from '../race.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { TestBed } from '@angular/core/testing';
import { CharacterClass,
         GameCharacter,
         LevelBonus,
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
    'neutre'
  ];
  strengthBonus: number;
  dexterityBonus: number;
  constitutionBonus: number;
  intelligenceBonus: number;
  wisdomBonus: number;
  charismBonus: number;
  fortitudeSave: number;
  reflexSave: number;
  willSave: number;

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
    this.strengthBonus = this.setAbilityBonus(this.gameCharacter.strength);
    this.gameCharacter.dexterity = this.setAbility();
    this.dexterityBonus = this.setAbilityBonus(this.gameCharacter.dexterity);
    this.gameCharacter.constitution = this.setAbility();
    this.constitutionBonus = this.setAbilityBonus(this.gameCharacter.constitution);
    this.gameCharacter.intelligence = this.setAbility();
    this.intelligenceBonus = this.setAbilityBonus(this.gameCharacter.intelligence);
    this.gameCharacter.wisdom = this.setAbility();
    this.wisdomBonus = this.setAbilityBonus(this.gameCharacter.wisdom);
    this.gameCharacter.charism = this.setAbility();
    this.charismBonus = this.setAbilityBonus(this.gameCharacter.charism);
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
      this.setWeight();
    }
  }

  classChanged(classValue: CharacterClass): void {
    if (typeof this.gameCharacter.sex !== 'undefined' && typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setHeight();
      this.setWeight();
    }
    if (typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setStartingAge();
      this.fortitudeSave = this.setSave(this.gameCharacter.characterClass.fortitudeSave, this.constitutionBonus);
      this.reflexSave = this.setSave(this.gameCharacter.characterClass.reflexSave, this.dexterityBonus);
      this.willSave = this.setSave(this.gameCharacter.characterClass.willSave, this.wisdomBonus);
    }
  }

  setAbility (): number {
    return 8 + this.rollingDice(1, 10);
  }

  setStartingAge(): void {
    this.gameCharacter.age = +(this.gameCharacter.characterClass.startingAge + this.rollingDice(
      this.gameCharacter.characterClass.startingAgeModifier.numberOfDice,
      this.gameCharacter.characterClass.startingAgeModifier.numberOfSides
    ));
  }

  setHeight(): void {
    this.gameCharacter.height = +(this. gameCharacter.characterClass.race.baseHeight + this.rollingDice(
      this.gameCharacter.characterClass.race.heightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.heightModifier.numberOfSides
    ) / 100).toFixed(2);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.height = +(this.gameCharacter.height - this.gameCharacter.characterClass.race.heightSexModifier).toFixed(2);
    }
  }

  setWeight(): void {
    this.gameCharacter.weight = +(this.gameCharacter.characterClass.race.baseWeight + this.rollingDice(
      this.gameCharacter.characterClass.race.weightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.weightModifier.numberOfSides,
    ) / 2).toFixed(0);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.weight = +(this.gameCharacter.weight - this.gameCharacter.characterClass.race.weightSexModifier).toFixed(2);
    }
  }

  rollingDice(dice: number, sides: number): number {
    let result = 0;
    for (let i = 0; i < dice; i++) {
      result = result + +(Math.trunc((Math.random() * sides)) + 1).toFixed(0);
    }
    return result;
  }

  setAbilityBonus(ability: number): number {
    let bonus = 0;
    if (ability > 10) {
      bonus = +(Math.trunc((ability - 10) / 2)).toFixed(0);
    } else if (ability < 10 ) {
      bonus = +(Math.trunc((ability - 11) / 2)).toFixed(0);
    } else {
      bonus = 0;
    }
    return bonus;
  }

  setSave(levelBonus: LevelBonus, bonusAbility: number): number {
    let save = 0;
    save = levelBonus.level1 + bonusAbility;
    return save;
  }
}
