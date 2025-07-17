import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { UniversitiesTableComponent } from './pages/admin-panel/universities-table/universities-table';
import { UsersTableComponent } from './pages/admin-panel/users-table/users-table';
import { ActividadUsuarioTableComponent } from './pages/admin-panel/actividad-usuario-table/actividad-usuario-table';
import { TagsTableComponent } from './pages/admin-panel/tags/tags';
import { AsistenciasEventos } from './pages/admin-panel/asistencias-eventos/asistencias-eventos';
import { Conversaciones } from './pages/admin-panel/conversaciones/conversaciones';
import { Eventos } from './pages/admin-panel/eventos/eventos';
import { Foros } from './pages/admin-panel/foros/foros';
import { Mensajes } from './pages/admin-panel/mensajes/mensajes';
import { OfertasLaborales } from './pages/admin-panel/ofertas-laborales/ofertas-laborales';
import { Oportunidades } from './pages/admin-panel/oportunidades/oportunidades';
import { PostulacionesLaborales } from './pages/admin-panel/postulaciones-laborales/postulaciones-laborales';

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
            { path: 'conversaciones', component: Conversaciones },
            { path: 'eventos', component: Eventos },
            { path: 'foros', component: Foros },
            { path: 'mensajes', component: Mensajes },
            { path: 'ofertasLaborales', component: OfertasLaborales },
            { path: 'oportunidades', component: Oportunidades },
            { path: 'postulacionesLaborales', component: PostulacionesLaborales }

        ]
    },
];
