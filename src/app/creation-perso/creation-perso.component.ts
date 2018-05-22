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
  strengthBonus = 0;
  dexterityBonus = 0;
  constitutionBonus = 0;
  intelligenceBonus = 0;
  wisdomBonus = 0;
  charismBonus = 0;
  fortitudeSave: number;
  reflexSave: number;
  willSave: number;
  rank: string;
  chosenScore: any;
  draw1: number;
  draw2: number;
  draw3: number;
  draw4: number;
  draw5: number;
  draw6: number;

  constructor(
    public userPageComponent: UserPageComponent,
    public gameCharacterService: GameCharacterService,
    public characterClassService: CharacterClassService,
    public raceService: RaceService,
    public calculationService: CalculationService
  ) { }

  ngOnInit(): void {
    this.characterClassService.getClassNameList().subscribe(
      classList => this.characterClasses = classList
    );
    this.gameCharacter.level = 1;
    this.draw1 = this.setAbility();
    this.draw2 = this.setAbility();
    this.draw3 = this.setAbility();
    this.draw4 = this.setAbility();
    this.draw5 = this.setAbility();
    this.draw6 = this.setAbility();
  }

  onSubmit(): void {
    this.gameCharacter.user = this.userPageComponent.getUser();
    this.gameCharacter.level = 1;
    this.gameCharacterService.createGameCharacter(this.gameCharacter).subscribe();
  }

  sexChanged(): void {
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

  classChanged(): void {
    if (typeof this.gameCharacter.sex !== 'undefined' && typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setHeight();
      this.setWeight();
    }
    if (typeof this.gameCharacter.characterClass !== 'undefined') {
      this.setStartingAge();
      this.setStartingWealth();
      this.setStartingEndurance();
      this.rank = this.calculationService.setRank(this.gameCharacter.level, this.gameCharacter.characterClass);
      this.fortitudeSave = this.calculationService.setSave(this.gameCharacter.characterClass.fortitudeSave, 1, this.constitutionBonus);
      this.reflexSave = this.calculationService.setSave(this.gameCharacter.characterClass.reflexSave, 1, this.dexterityBonus);
      this.willSave = this.calculationService.setSave(this.gameCharacter.characterClass.willSave, 1, this.wisdomBonus);
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

  setNewScore(score: any): number {
    let storedScore: any;
    storedScore = score;
    score = this.chosenScore;
    this.chosenScore = storedScore;
    return score;
  }

  chooseScore(value: string): void {
    switch (value) {
      case 'strength':
        this.gameCharacter.strength = this.setNewScore(this.gameCharacter.strength);
        this.strengthBonus = this.calculationService.setAbilityBonus(this.gameCharacter.strength);
        console.log('force: ' + this.gameCharacter.strength);
        console.log('bonus force: ' + this.strengthBonus);
        break;
      case 'dexterity':
        this.gameCharacter.dexterity = this.setNewScore(this.gameCharacter.dexterity);
        this.dexterityBonus = this.calculationService.setAbilityBonus(this.gameCharacter.dexterity);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.reflexSave = this.calculationService.setSave(this.gameCharacter.characterClass.reflexSave, 1, this.dexterityBonus);
        } else {
          this.reflexSave = this.dexterityBonus;
        }
        break;
      case 'constitution':
        this.gameCharacter.constitution = this.setNewScore(this.gameCharacter.constitution);
        this.constitutionBonus = this.calculationService.setAbilityBonus(this.gameCharacter.constitution);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.fortitudeSave = this.calculationService.setSave(this.gameCharacter.characterClass.fortitudeSave, 1, this.constitutionBonus);
        } else {
          this.fortitudeSave = this.constitutionBonus;
        }
        this.setStartingEndurance();
        break;
      case 'intelligence':
        this.gameCharacter.intelligence = this.setNewScore(this.gameCharacter.intelligence);
        this.intelligenceBonus = this.calculationService.setAbilityBonus(this.gameCharacter.intelligence);
        break;
      case 'wisdom':
        this.gameCharacter.wisdom = this.setNewScore(this.gameCharacter.wisdom);
        this.wisdomBonus = this.calculationService.setAbilityBonus(this.gameCharacter.wisdom);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.willSave = this.calculationService.setSave(this.gameCharacter.characterClass.willSave, 1, this.wisdomBonus);
        } else {
          this.willSave = this.wisdomBonus;
        }
        break;
      case 'charism':
        this.gameCharacter.charism = this.setNewScore(this.gameCharacter.charism);
        this.charismBonus = this.calculationService.setAbilityBonus(this.gameCharacter.charism);
        break;
      case 'draw1':
        this.draw1 = this.setNewScore(this.draw1);
        break;
      case 'draw2':
        this.draw2 = this.setNewScore(this.draw2);
        break;
      case 'draw3':
        this.draw3 = this.setNewScore(this.draw3);
        break;
      case 'draw4':
        this.draw4 = this.setNewScore(this.draw4);
        break;
      case 'draw5':
        this.draw5 = this.setNewScore(this.draw5);
        break;
      case 'draw6':
        this.draw6 = this.setNewScore(this.draw6);
        break;
    }
  }

  setStartingEndurance() {
    if (typeof this.gameCharacter.characterClass === 'undefined') {
      this.gameCharacter.endurance = this.constitutionBonus;
    } else {
      this.gameCharacter.endurance =
        this.gameCharacter.characterClass.enduranceDie.numberOfSides +
        this.constitutionBonus;
    }
  }

  setStartingWealth() {
    if (this.gameCharacter.characterClass.wealthModifier !== null) {
        const bonusWealth = this.calculationService.rollingDice(
          this.gameCharacter.characterClass.wealthModifier.numberOfDice,
          this.gameCharacter.characterClass.wealthModifier.numberOfSides);
          this.gameCharacter.wealth = this.gameCharacter.characterClass.startingWealth + bonusWealth;
    } else {
      this.gameCharacter.wealth = this.gameCharacter.characterClass.startingWealth;
    }
  }
}
