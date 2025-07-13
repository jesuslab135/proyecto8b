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
import { EventosTableComponent } from './pages/admin-panel/eventos-table/eventos-table';
import { ForosTableComponent } from './pages/admin-panel/foros-table/foros-table';
import { MensajesTableComponent } from './pages/admin-panel/mensajes-table/mensajes-table';
import { OportunidadesTableComponent } from './pages/admin-panel/oportunidades-table/oportunidades-table';
import { RolesProyectoTableComponent } from './pages/admin-panel/roles-proyecto-table/roles-proyecto-table';
import { RolesUsuarioTableComponent } from './pages/admin-panel/roles-usuario-table/roles-usuario-table';
import { HilosTableComponent } from './pages/admin-panel/hilos-table/hilos-table';
import { ExperienciaUsuarioTableComponent } from './pages/admin-panel/experiencia-usuario-table/experiencia-usuario-table';
import { ProyectosTableComponent } from './pages/admin-panel/proyectos-table/proyectos-table';
import { ProyectosValidacionesTableComponent } from './pages/admin-panel/proyectos-validaciones-table/proyectos-validaciones-table';

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
            { path: 'eventos', component: EventosTableComponent },
            { path: 'foros', component: ForosTableComponent },
            { path: 'mensajes', component: MensajesTableComponent },
            { path: 'oportunidades', component: OportunidadesTableComponent },
            { path: 'roles-proyecto', component: RolesProyectoTableComponent },
            { path: 'roles-usuario', component: RolesUsuarioTableComponent },
            { path: 'hilos', component: HilosTableComponent },
            { path: 'experiencias-usuario', component: ExperienciaUsuarioTableComponent },
            { path: 'proyectos', component: ProyectosTableComponent },
            { path: 'proyectos-validaciones', component: ProyectosValidacionesTableComponent },
        ]
    },
];
