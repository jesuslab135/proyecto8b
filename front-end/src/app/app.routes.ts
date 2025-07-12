import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { UniversitiesTableComponent } from './pages/admin-panel/universities-table/universities-table';
import { UsersTableComponent } from './pages/admin-panel/users-table/users-table';
import { ActividadUsuarioTableComponent } from './pages/admin-panel/actividad-usuario-table/actividad-usuario-table';
import { TagsTableComponent } from './pages/admin-panel/tags/tags';
import { AsistenciasEventos } from './pages/admin-panel/asistencias-eventos/asistencias-eventos';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path:'register', component: Register },
    { 
        path: 'admin', 
        component: AdminPanel,
        children: [
            { path: 'universities', component: UniversitiesTableComponent },
            { path: 'users', component: UsersTableComponent },
            { path: 'actividad', component: ActividadUsuarioTableComponent },
            { path: 'tags', component: TagsTableComponent },
            { path: 'asistenciasEventos', component: AsistenciasEventos },
        ]
    },
];
