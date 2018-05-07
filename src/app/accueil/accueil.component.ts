import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { GameCharacterService } from '../game-character.service';
import { GameCharacter } from '../models';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  gameCharacter: GameCharacter;
  gameCharacters = new Array<GameCharacter[]>();

  colonnes = ['nom', 'classe', 'niveau', 'note', 'votants'];
  dataList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public gameCharacterService: GameCharacterService,
  ) { }

  ngOnInit() {
    console.log('dans le onInit');
    // Obtenir la liste des personnages
    this.gameCharacterService.getGameCharacterList().subscribe(
      characters => {
        console.log('debut du subscribe');
        this.dataList = new MatTableDataSource(characters);
        this.dataList.paginator = this.paginator;
        this.dataList.sort = this.sort;
        console.log('fin du subscribe');
      }
    );
  }

  // Filtrage de la liste de personnages
  filterTable(filterValue: string) {
    console.log('dans le filterTable');
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataList.filter = filterValue;
  }
}
