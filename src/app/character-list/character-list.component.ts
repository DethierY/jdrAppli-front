import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';
import { GameCharacterService } from '../game-character.service';
import { GameCharacter } from '../models';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

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
  id: number;

  colonnes = ['nom', 'classe', 'niveau', 'joueur', 'note', 'votants'];
  dataList;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public gameCharacterService: GameCharacterService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Obtenir la liste des personnages
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('this.route' + this.route.snapshot);
      this.id = +this.route.snapshot.paramMap.get('id');
      this.gameCharacterService.getCharacterList(this.id).subscribe(
        characters => {
          this.dataList = new MatTableDataSource(characters);
          this.dataList.paginator = this.paginator;
          this.dataList.sort = this.sort;
          if (characters !== null && characters.length > 1 ) {
            this.numberCharacters = characters.length;
            this.personnage = 'personnages';
          } else if (characters !== null && characters.length === 1) {
              this.numberCharacters = characters.length;
              this.personnage = 'personnage';
          } else {
              this.numberCharacters = 0;
              this.personnage = 'personnage';
          }
        }
      );
    });
  }

  // Filtrage de la liste de personnages
  filterTable(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataList.filter = filterValue;
  }

  userCharacters(id) {
    console.log('dans userCharacters(id) de character-list');
    this.id = id;
    this.ngOnInit();
  }

}
