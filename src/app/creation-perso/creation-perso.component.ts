import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacter,
         CharacterClass } from '../models';
import { GameCharacterService } from '../game-character.service';
import { CharacterClassService } from '../character-class.service';
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

  character: GameCharacter = new GameCharacter();
  classControl = new FormControl('', [Validators.required]);
  characterClass: CharacterClass;
  characterClasses: CharacterClass[];

  constructor(
    public gameCharacterService: GameCharacterService,
    public characterClassService: CharacterClassService
  ) { }

  ngOnInit() {
    this.characterClassService.getClassNameList().subscribe(
      classList => this.characterClasses = classList
    );
   }

  onSubmit() {
    // this.gameCharacterService.createCharacter(this.character).subscribe();
  }
}
