import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import { GameCharacter } from './models';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};
const postHttpOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json'}),
  responseType: 'text' as 'text'
};
const HOST = 'http://localhost:8080/character';

@Injectable()
export class GameCharacterService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getCharacterList(id): Observable<GameCharacter[]> {
    if (id === 0) {
      return this.getGameCharacterList();
    } else {
      return this.getUserGameCharacterList(id);
    }
  }

  public getGameCharacterList(): Observable<GameCharacter[]> {
    return this.http.get(`${HOST}/list`, httpOptions) as Observable<GameCharacter[]>;
  }

  public getUserGameCharacterList(id: number): Observable<GameCharacter[]> {
    return this.http.get(`${HOST}/list/${id}`, httpOptions) as Observable<GameCharacter[]>;
  }

  public createGameCharacter(gameCharacter: GameCharacter): Observable<String> {
    return this.http.post(`${HOST}/create`, gameCharacter, postHttpOptions) as Observable<String>;
  }
}
