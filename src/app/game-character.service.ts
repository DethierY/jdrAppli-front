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

  getCharacterList(id): Observable<GameCharacter[]> {
    if (id === 0) {
      return this.getGameCharacterList();
    } else {
      return this.getUserGameCharacterList(id);
    }
  }

  getGameCharacterList(): Observable<GameCharacter[]> {
    return this.http.get(`${HOST}/list`) as Observable<GameCharacter[]>;
  }

  getUserGameCharacterList(id): Observable<GameCharacter[]> {
    return this.http.get(`${HOST}/list/${id}`) as Observable<GameCharacter[]>;
  }

  createGameCharacter(gameCharacter: GameCharacter): Observable<GameCharacter> {
    return this.http.post(`${HOST}/create`, gameCharacter) as Observable<GameCharacter>;
  }
}
