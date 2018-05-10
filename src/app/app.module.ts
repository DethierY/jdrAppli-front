import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RoutingModule } from './/routing.module';

import { GameCharacterService } from './game-character.service';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserService } from './user.service';
import { CreationPersoComponent } from './creation-perso/creation-perso.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CharacterListComponent,
    UserPageComponent,
    CreationPersoComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule,
    RoutingModule
  ],
  providers: [
    GameCharacterService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
