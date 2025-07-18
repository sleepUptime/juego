import { Routes } from '@angular/router';
import { CreacionPersonajeComponent } from './component/creacion-personaje/creacion-personaje.component';
import { CombateComponent } from './component/combate/combate.component';
import { HomeComponent } from './component/home/home.component';
import { ExpansionComponent } from './component/expansion/expansion.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },{
        path: 'crear-personaje',
        component: CreacionPersonajeComponent
    },{
        path:'combate',
        component: CombateComponent
    },{
        path: 'expansion',
        component: ExpansionComponent
    }
];
