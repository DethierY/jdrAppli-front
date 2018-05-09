import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  id = 1;
  user: User;
  userName: string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUser(this.id).subscribe(
      user => this.user = user
    );
  }

  accueil() {
    this.router.navigate(['../accueil'], {relativeTo: this.route});
  }

}
