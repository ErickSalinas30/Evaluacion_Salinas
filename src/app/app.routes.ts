import { Routes } from '@angular/router';
import { Pages } from './pages/pages';
import { App } from './app';

export const routes: Routes = 
[
    
    {path: 'inicio', component: App},
    {path: 'busqueda/pages', component: Pages}
];
