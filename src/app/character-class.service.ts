import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import { Name } from './models';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};
const HOST = 'http://localhost:8080/class';

@Injectable()
export class CharacterClassService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getClassNameList(): Observable<Name[]> {
    return this.http.get(`${HOST}/names`) as Observable<Name[]>;
  }
}
