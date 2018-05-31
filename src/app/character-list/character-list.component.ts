import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GameCharacterService } from '../game-character.service';
import { GameCharacter, TableRow } from '../models';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  numberCharacters: number;
  personnage: string;
  id: number;

  colonnes = ['characterName', 'className', 'characterLevel', 'userName', 'score', 'numberOfVoters'];
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
      this.id = +this.route.snapshot.paramMap.get('id');
      console.log(0);
      this.gameCharacterService.getCharacterList(this.id).subscribe(
        characters => {
          console.log(1);
          const tableData: TableRow[] = this.configureData(characters);
          console.log(2);
          this.dataList = new MatTableDataSource(tableData);
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
  private filterTable(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataList.filter = filterValue;
  }

  private userCharacters(id) {
    this.id = id;
    this.ngOnInit();
  }

  private configureData (characterList: GameCharacter[]): TableRow[] {
    const tableData: TableRow[] = new Array<TableRow>();
    for (const character of characterList) {
      const tableRow: TableRow = new TableRow();
      tableRow.characterName = character.characterName;
      tableRow.className = character.characterClass.className;
      tableRow.characterLevel = character.level;
      tableRow.userName = character.user.name;
      if (character.appreciation !== null) {
        tableRow.score = character.appreciation.averageScore;
        tableRow.numberOfVoters = character.appreciation.numberOfVoters;
      }
      tableData.push(tableRow);
    }
    return tableData;
  }

}
