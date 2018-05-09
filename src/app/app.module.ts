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

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CharacterListComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    NoopAnimationsModule,
    RoutingModule
  ],
  providers: [GameCharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
