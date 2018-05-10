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

  id = 1;
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
    console.log('ngOnInit isUserCharacters devient false');
    this.userService.getUser(this.id).subscribe(
      user => this.user = user
    );
  }

  myCharacters() {
    if (!this.isUserCharacters) {
      this.isUserCharacters = true;
      this.router.navigate(['./list/', this.id], {relativeTo: this.route});
    } else {
      this.isUserCharacters = false;
      this.router.navigate(['./list'], {relativeTo: this.route});
    }
  }

  disconnection() {
    this.user = null;
    this.router.navigate(['../accueil/list'], {relativeTo: this.route});
  }
}
