import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { CalculationService } from '../calculation.service';
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
    public raceService: RaceService,
    public calculationService: CalculationService
  ) { }

  ngOnInit() {
    this.characterClassService.getClassNameList().subscribe(
      classList => this.characterClasses = classList
    );
    this.gameCharacter.level = 1;
    this.gameCharacter.strength = this.setAbility();
    this.strengthBonus = this.calculationService.setAbilityBonus(this.gameCharacter.strength);
    this.gameCharacter.dexterity = this.setAbility();
    this.dexterityBonus = this.calculationService.setAbilityBonus(this.gameCharacter.dexterity);
    this.gameCharacter.constitution = this.setAbility();
    this.constitutionBonus = this.calculationService.setAbilityBonus(this.gameCharacter.constitution);
    this.gameCharacter.intelligence = this.setAbility();
    this.intelligenceBonus = this.calculationService.setAbilityBonus(this.gameCharacter.intelligence);
    this.gameCharacter.wisdom = this.setAbility();
    this.wisdomBonus = this.calculationService.setAbilityBonus(this.gameCharacter.wisdom);
    this.gameCharacter.charism = this.setAbility();
    this.charismBonus = this.calculationService.setAbilityBonus(this.gameCharacter.charism);
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
      this.fortitudeSave = this.setSave(this.gameCharacter.characterClass.fortitudeSave, 1, this.constitutionBonus);
      this.reflexSave = this.setSave(this.gameCharacter.characterClass.reflexSave, 1, this.dexterityBonus);
      this.willSave = this.setSave(this.gameCharacter.characterClass.willSave, 1, this.wisdomBonus);
    }
  }

  setAbility (): number {
    return 8 + this.calculationService.rollingDice(1, 10);
  }

  setStartingAge(): void {
    this.gameCharacter.age = +(this.gameCharacter.characterClass.startingAge + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.startingAgeModifier.numberOfDice,
      this.gameCharacter.characterClass.startingAgeModifier.numberOfSides
    ));
  }

  setHeight(): void {
    this.gameCharacter.height = +(this. gameCharacter.characterClass.race.baseHeight + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.race.heightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.heightModifier.numberOfSides
    ) / 100).toFixed(2);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.height = +(this.gameCharacter.height - this.gameCharacter.characterClass.race.heightSexModifier).toFixed(2);
    }
  }

  setWeight(): void {
    this.gameCharacter.weight = +(this.gameCharacter.characterClass.race.baseWeight + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.race.weightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.weightModifier.numberOfSides,
    ) / 2).toFixed(0);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.weight = +(this.gameCharacter.weight - this.gameCharacter.characterClass.race.weightSexModifier).toFixed(2);
    }
  }

  setSave(levelBonus: LevelBonus, level: number, bonusAbility: number): number {
    let save = 0;
    save = this.calculationService.setLevelBonusValue(levelBonus, level) + bonusAbility;
    return save;
  }

}
