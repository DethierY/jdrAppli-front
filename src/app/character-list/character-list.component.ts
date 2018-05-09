import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { GameCharacterService } from '../game-character.service';
import { GameCharacter } from '../models';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  gameCharacter: GameCharacter;
  gameCharacters = new Array<GameCharacter[]>();
  numberCharacters: number;
  personnage: string;

  colonnes = ['nom', 'classe', 'niveau', 'note', 'votants'];
  dataList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public gameCharacterService: GameCharacterService,
  ) { }

  ngOnInit() {
    // Obtenir la liste des personnages
    this.gameCharacterService.getGameCharacterList().subscribe(
      characters => {
        this.dataList = new MatTableDataSource(characters);
        this.dataList.paginator = this.paginator;
        this.dataList.sort = this.sort;
        if (characters.length === 1 || characters.length === 0 || characters === null) {
          this.numberCharacters = 0;
          this.personnage = 'personnage';
        } else {
          this.numberCharacters = characters.length;
          this.personnage = 'personnages';
        }
      }
    );
  }

  // Filtrage de la liste de personnages
  filterTable(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataList.filter = filterValue;
  }
}
