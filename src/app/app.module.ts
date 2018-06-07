import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './/routing.module';

import { CalculationService } from './calculation.service';
import { CharacterClassService } from './character-class.service';
import { GameCharacterService } from './game-character.service';
import { RaceService } from './race.service';
import { UserService } from './user.service';

import { AccueilComponent } from './accueil/accueil.component';
import { AlertDataComponent } from './alert-data/alert-data.component';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CreationPersoComponent } from './creation-perso/creation-perso.component';
import { ResponseComponent } from './response/response.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CommunicationService } from './communication.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CharacterListComponent,
    UserPageComponent,
    CreationPersoComponent,
    ResponseComponent,
    AlertDataComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [
    GameCharacterService,
    UserService,
    CharacterClassService,
    RaceService,
    CalculationService,
    CommunicationService
  ],
  entryComponents: [
    ResponseComponent,
    AlertDataComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
