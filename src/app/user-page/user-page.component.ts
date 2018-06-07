import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../user.service';
import { CommunicationService } from '../communication.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CharacterListComponent } from '../character-list/character-list.component';
import { AlertDataComponent } from '../alert-data/alert-data.component';

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
    public communicationService: CommunicationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.isUserCharacters = false;
    this.userService.getUser(this.idUser).subscribe(
      user => this.user = user
    );
  }

   // ouverture du popupu de réponse
   private openWarning( ): void {
    const dialogRef = this.dialog.open(AlertDataComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe();
  }

  // passage entre liste des prsonnages et liste des personnages de l'utilisateur
  private changeCharacterList(): void {
    if (this.communicationService.getIsWarning() === true) {
      this.openWarning();
    } else {
      if (!this.isUserCharacters) {
        this.isUserCharacters = true;
        this.router.navigate(['./list/', this.idUser], {relativeTo: this.route});
      } else {
        this.isUserCharacters = false;
        this.router.navigate(['./list'], {relativeTo: this.route});
      }
    }
  }

  // obtenir l'utilisateur connecté
  public getUser(): User {
    return this.user;
  }

  // déconnexion du compte
  private toDisconnect(): void {
    this.user = null;
    this.router.navigate(['../accueil/list'], {relativeTo: this.route});
  }

  // affichage du formulaire de création de personnage
  private goToCharacterCreationForm(): void {
    this.router.navigate(['./create'], {relativeTo: this.route});
  }

}
