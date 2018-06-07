import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { CalculationService } from '../calculation.service';
import { CommunicationService } from '../communication.service';
import { RaceService } from '../race.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { MatDialog } from '@angular/material';
import { ResponseComponent } from '../response/response.component';
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
  characterClass: CharacterClass;
  characterClasses: CharacterClass[];
  race: Race;
  fortitudeSave: number;
  reflexSave: number;
  willSave: number;
  rank: string;
  draw1: number;
  draw2: number;
  draw3: number;
  draw4: number;
  draw5: number;
  draw6: number;
  chosenScore: any;

  constructor(
    public dialog: MatDialog,
    public userPageComponent: UserPageComponent,
    public gameCharacterService: GameCharacterService,
    public characterClassService: CharacterClassService,
    public raceService: RaceService,
    public calculationService: CalculationService,
    public communicationService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.characterClassService.getClassNameList().subscribe(
      classList => this.characterClasses = classList
    );
    this.communicationService.setIsWarning(true);
    this.gameCharacter.level = 1;
    this.draw1 = this.setAbility();
    this.draw2 = this.setAbility();
    this.draw3 = this.setAbility();
    this.draw4 = this.setAbility();
    this.draw5 = this.setAbility();
    this.draw6 = this.setAbility();
  }

  // création du personnage
  private onSubmit(): void {
    this.gameCharacter.user = this.userPageComponent.getUser();
    this.createGameCharacter(this.gameCharacter);
  }

  // gestion de la réponse de la création de personnage
  private createGameCharacter(gameCharacter: GameCharacter): void {
    let isCreationOK: boolean;
    this.gameCharacterService.createGameCharacter(gameCharacter).subscribe (
      (data: string) => {
        isCreationOK = true;
        this.communicationService.setIsWarning(false);
        this.openResponse(data, isCreationOK);
        },
      (err: HttpErrorResponse) => {
        isCreationOK = false;
        this.openResponse(err.error, isCreationOK);
      }
    );
  }

  // ouverture du popup de réponse
  private openResponse(creationResponse: string, isCreationOK: boolean): void {
    const dialogRef = this.dialog.open(ResponseComponent, {
      width: '250px',
      data: { creationResponse: creationResponse,
        isCreationOK: isCreationOK}
    });
    dialogRef.afterClosed().subscribe();
  }

  // recalcule taille et poids après changement du sexe
  private sexChanged(): void {
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

  // recalcule des données dépendant de la classe après changement de classe
  private classChanged(): void {
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

  // caulcul de caractéristique
  private setAbility (): number {
    return 8 + this.calculationService.rollingDice(1, 10);
  }

  // détermination de l'âge
  private setStartingAge(): void {
    this.gameCharacter.age = +(this.gameCharacter.characterClass.startingAge + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.startingAgeModifier.numberOfDice,
      this.gameCharacter.characterClass.startingAgeModifier.numberOfSides
    ));
  }

  // calcul de la taille
  private setHeight(): void {
    this.gameCharacter.height = +(this. gameCharacter.characterClass.race.baseHeight + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.race.heightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.heightModifier.numberOfSides
    ) / 100).toFixed(2);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.height = +(this.gameCharacter.height - this.gameCharacter.characterClass.race.heightSexModifier).toFixed(2);
    }
  }

  // Calcul du poids
  private setWeight(): void {
    this.gameCharacter.weight = +(this.gameCharacter.characterClass.race.baseWeight + this.calculationService.rollingDice(
      this.gameCharacter.characterClass.race.weightModifier.numberOfDice,
      this.gameCharacter.characterClass.race.weightModifier.numberOfSides,
    ) / 2).toFixed(0);
    if (this.gameCharacter.sex === 'femme') {
      this.gameCharacter.weight = +(this.gameCharacter.weight - this.gameCharacter.characterClass.race.weightSexModifier).toFixed(2);
    }
  }

  // attribuer un nouvelle valeur à une caractéristique
  private setNewAbilityScore(score: any): number {
    let storedScore: any;
    storedScore = score;
    score = this.chosenScore;
    this.chosenScore = storedScore;
    return score;
  }

  // gestion de la répartition des tirages dasn les caractéristques
  private chooseRoll(value: string): void {
    switch (value) {
      case 'strength':
        this.gameCharacter.strength = this.setNewAbilityScore(this.gameCharacter.strength);
        this.strengthBonus = this.calculationService.setAbilityBonus(this.gameCharacter.strength);
        break;
      case 'dexterity':
        this.gameCharacter.dexterity = this.setNewAbilityScore(this.gameCharacter.dexterity);
        this.dexterityBonus = this.calculationService.setAbilityBonus(this.gameCharacter.dexterity);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.reflexSave = this.calculationService.setSave(this.gameCharacter.characterClass.reflexSave, 1, this.dexterityBonus);
        } else {
          this.reflexSave = this.dexterityBonus;
        }
        break;
      case 'constitution':
        this.gameCharacter.constitution = this.setNewAbilityScore(this.gameCharacter.constitution);
        this.constitutionBonus = this.calculationService.setAbilityBonus(this.gameCharacter.constitution);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.fortitudeSave = this.calculationService.setSave(this.gameCharacter.characterClass.fortitudeSave, 1, this.constitutionBonus);
        } else {
          this.fortitudeSave = this.constitutionBonus;
        }
        this.setStartingEndurance();
        break;
      case 'intelligence':
        this.gameCharacter.intelligence = this.setNewAbilityScore(this.gameCharacter.intelligence);
        this.intelligenceBonus = this.calculationService.setAbilityBonus(this.gameCharacter.intelligence);
        break;
      case 'wisdom':
        this.gameCharacter.wisdom = this.setNewAbilityScore(this.gameCharacter.wisdom);
        this.wisdomBonus = this.calculationService.setAbilityBonus(this.gameCharacter.wisdom);
        if (typeof this.gameCharacter.characterClass !== 'undefined') {
          this.willSave = this.calculationService.setSave(this.gameCharacter.characterClass.willSave, 1, this.wisdomBonus);
        } else {
          this.willSave = this.wisdomBonus;
        }
        break;
      case 'charism':
        this.gameCharacter.charisma = this.setNewAbilityScore(this.gameCharacter.charisma);
        this.charismBonus = this.calculationService.setAbilityBonus(this.gameCharacter.charisma);
        break;
      case 'draw1':
        this.draw1 = this.setNewAbilityScore(this.draw1);
        break;
      case 'draw2':
        this.draw2 = this.setNewAbilityScore(this.draw2);
        break;
      case 'draw3':
        this.draw3 = this.setNewAbilityScore(this.draw3);
        break;
      case 'draw4':
        this.draw4 = this.setNewAbilityScore(this.draw4);
        break;
      case 'draw5':
        this.draw5 = this.setNewAbilityScore(this.draw5);
        break;
      case 'draw6':
        this.draw6 = this.setNewAbilityScore(this.draw6);
        break;
    }
  }

  // Calcul endurance
  private setStartingEndurance(): void {
    if (typeof this.gameCharacter.characterClass === 'undefined') {
      this.gameCharacter.endurance = this.constitutionBonus;
    } else {
      this.gameCharacter.endurance =
        this.gameCharacter.characterClass.enduranceDie.numberOfSides +
        this.constitutionBonus;
    }
  }

  // Calcul du pécule
  private setStartingWealth(): void {
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
