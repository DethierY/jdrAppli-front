import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RoutingModule } from './/routing.module';

import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { PublicMainComponent } from './public-main/public-main.component';
import { SortOptionsComponent } from './sort-options/sort-options.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    PublicMainComponent,
    SortOptionsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    NoopAnimationsModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
