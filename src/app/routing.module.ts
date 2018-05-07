import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/accueil', pathMatch: 'full' },
    { path: 'accueil', component: AccueilComponent }
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

