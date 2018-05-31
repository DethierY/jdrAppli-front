import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';
import { Race } from './models';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};
const HOST = 'http://localhost:8080/class';

@Injectable()
export class RaceService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getRaceList(): Observable<Race[]> {
    return this.http.get(`${HOST}/list`) as Observable<Race[]>;
  }
}
