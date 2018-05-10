import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GameCharacter,
         Name } from '../models';
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
  name: Name;
  classNames: Name[];
  //   {name: 'Artilleur Nain de Bor'},
  //   {name: 'Boucanier Chadaki'},
  //   {name: 'Chevalier de Sommerlund'},
  //   {name: "Frère de l'Etoile de Cristal"},
  //   {name: 'Mage de Dessi'},
  //   {name: 'Seigneur Kaï'}
  // ];

  constructor(
    public gameCharacterService: GameCharacterService,
    public characterClassService: CharacterClassService
  ) { }

  ngOnInit() {
    this.characterClassService.getClassNameList().subscribe(
      classNames => this.classNames = classNames
    );
   }

  onSubmit() {
    // this.gameCharacterService.createCharacter(this.character).subscribe();
  }
}
