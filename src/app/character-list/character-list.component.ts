import { Component, OnInit } from '@angular/core';
import { ICharacter } from '../objects/ICharacter';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  visibleCharacters: ICharacter[];
  characters: ICharacter[];
  numberCharacters: number;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {

    this.characters = this.characterService.getCharacters();
    this.numberCharacters = this.characters.length;
    this.visibleCharacters = this.characters.slice(0, 15);
  }

}
