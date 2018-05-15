import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
import { RaceService } from '../race.service';
import { UserPageComponent } from '../user-page/user-page.component';
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
export class CreationPersoComponent implements OnInit, AfterContentChecked {

  gameCharacter: GameCharacter = new GameCharacter();
  classControl = new FormControl('', [Validators.required]);
  characterClass: CharacterClass;
  characterClasses: CharacterClass[];
  race: Race;
  races: Race[];
  sexes = [
    'femme',
    'homme'
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
    this.raceService.getRaceList().subscribe(
      raceList => this.races = raceList
    );
  }

  ngAfterContentChecked() {
    if (typeof this.gameCharacter.sex !== 'undefined' && typeof this.gameCharacter.characterClass !== 'undefined') {
      this.gameCharacter.height = this.setHeight();
    }
  }

  onSubmit() {
    this.gameCharacter.user = this.userPageComponent.getUser();
    this.gameCharacter.level = 1;
    console.log (this.gameCharacter);
    this.gameCharacterService.createGameCharacter(this.gameCharacter).subscribe();
  }

  setHeight(): any {
    let modifier = 0;
    let baseHeight = this.gameCharacter.characterClass.race.baseHeight;
    for (let i = 0; i < this.gameCharacter.characterClass.race.heightModifier.numberOfDices; i++) {
      modifier = modifier + ((Math.random() * this.gameCharacter.characterClass.race.heightModifier.numberOfSides) + 1);
    }
    if (this.gameCharacter.sex = 'femme') {
      baseHeight = baseHeight - this.gameCharacter.characterClass.race.heightSexModifier;
    }
    return (baseHeight + modifier / 100).toFixed(2);
  }

}
