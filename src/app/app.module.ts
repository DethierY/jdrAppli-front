import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { SortOptionsComponent } from './sort-options/sort-options.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharacterListComponent,
    SortOptionsComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MaterialModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
