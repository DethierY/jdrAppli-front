import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicMainComponent } from './public-main/public-main.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/public-main', pathMatch: 'full' },
    { path: 'public-main', component: PublicMainComponent }
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

