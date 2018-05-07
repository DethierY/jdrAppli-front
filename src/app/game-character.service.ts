import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import { GameCharacter } from './models';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};
const HOST = 'http://localhost:8080/character';

@Injectable()
export class GameCharacterService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getGameCharacterList(): Observable<GameCharacter[]> {
    console.log('dans le getGameCharacterList');
    return this.http.get(`${HOST}/list`) as Observable<GameCharacter[]>;
  }
}
