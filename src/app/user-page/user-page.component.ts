import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CharacterListComponent } from '../character-list/character-list.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  idUser = 1;
  user: User;
  userName: string;
  isUserCharacters: boolean;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isUserCharacters = false;
    this.userService.getUser(this.idUser).subscribe(
      user => this.user = user
    );
  }

  // passage entre liste des prsonnages et liste des personnages de l'utilisateur
  private changeCharacterList(): void {
    if (!this.isUserCharacters) {
      this.isUserCharacters = true;
      this.router.navigate(['./list/', this.idUser], {relativeTo: this.route});
    } else {
      this.isUserCharacters = false;
      this.router.navigate(['./list'], {relativeTo: this.route});
    }
  }

  public getUser(): User {
    return this.user;
  }

  private toDisconnect(): void {
    this.user = null;
    this.router.navigate(['../accueil/list'], {relativeTo: this.route});
  }

  private goToCharacterCreationForm(): void {
    this.router.navigate(['./create'], {relativeTo: this.route});
  }
}
