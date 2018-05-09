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
  userCharacter = false;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUser(this.id).subscribe(
      user => this.user = user
    );
  }

  home() {
    if (!this.userCharacter) {
      this.router.navigate(['../user'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../../user'], {relativeTo: this.route});
    }
  }

  myCharacters() {
    this.userCharacter = true;
    this.router.navigate(['./', this.id], {relativeTo: this.route});
  }

}
