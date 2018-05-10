import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CharacterListComponent } from './character-list/character-list.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/accueil/list', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent, children : [
        {path: 'list', component: CharacterListComponent },
    ]},
    { path: 'user', component: UserPageComponent, children: [
        {path: 'list', component: CharacterListComponent },
        {path: 'list/:id', component: CharacterListComponent },
    ]},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES),
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule { }

