import { Routes } from '@angular/router';
import { Pages } from './pages/pages';
import { App } from './app';

export const routes: Routes = 
[
    {path: '', redirectTo: 'inicio' , pathMatch: 'full'},
    {path: 'inicio', component: App},
    {path: 'pages', component: Pages}
];
