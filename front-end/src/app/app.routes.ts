import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { AdminPanel } from './pages/admin-panel/admin-panel';
import { UniversitiesTableComponent } from './pages/admin-panel/universities-table/universities-table';
import { UniversitiesFormComponent } from './pages/admin-panel/universities-table/universities-form.component';
import { UniversitiesCreateComponent } from './pages/admin-panel/universities-table/universities-create.component';
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
import { ReportesTableComponent } from './pages/admin-panel/reportes-table/reportes-table';
import { PerfilesTableComponent } from './pages/admin-panel/perfiles-table/perfiles-table';
import { TaggablesTableComponent } from './pages/admin-panel/taggables-table/taggables-table';
import { SeguimientosTableComponent } from './pages/admin-panel/seguimientos-table/seguimientos-table';
import { RespuestasHiloTableComponent } from './pages/admin-panel/respuestas-hilo-table/respuestas-hilo-table';
import { PostulacionesTableComponent } from './pages/admin-panel/postulaciones-table/postulaciones-table';
import { ParticipacionesProyectosTableComponent } from './pages/admin-panel/participaciones-proyectos-table/participaciones-proyectos-table';
import { PaginasColaborativasTableComponent } from './pages/admin-panel/paginas-colaborativas-table/paginas-colaborativas-table';
import { BloquesTableComponent } from './pages/admin-panel/bloques-table/bloques-table';
import { RelacionesBloquesTableComponent } from './pages/admin-panel/relaciones-bloques-table/relaciones-bloques-table';
import { VersionesBloquesTableComponent } from './pages/admin-panel/versiones-bloques-table/versiones-bloques-table';
import { TokensInicialesAccesoTableComponent } from './pages/admin-panel/tokens-iniciales-acceso-table/tokens-iniciales-acceso-table';
import { TagsCreateComponent } from './pages/admin-panel/tags/tags-create.component';
import { TagsFormComponent } from './pages/admin-panel/tags/tags-form.component';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin',
    component: AdminPanel,
    children: [
      { path: 'universities', component: UniversitiesTableComponent },
      { path: 'universities/create', component: UniversitiesCreateComponent },
      { path: 'universities/edit/:id', component: UniversitiesFormComponent },
      { path: 'users', component: UsersTableComponent },
      { path: 'actividad', component: ActividadUsuarioTableComponent },
      { path: 'tags', component: TagsTableComponent },
      { path: 'tags/create', component: TagsCreateComponent },
      { path: 'tags/edit/:id', component: TagsFormComponent },
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
      { path: 'reportes', component: ReportesTableComponent },
      { path: 'perfiles', component: PerfilesTableComponent },
      { path: 'taggables', component: TaggablesTableComponent },
      { path: 'seguimientos', component: SeguimientosTableComponent },
      { path: 'respuestas-hilos', component: RespuestasHiloTableComponent },
      { path: 'postulaciones', component: PostulacionesTableComponent },
      { path: 'participaciones-proyectos', component: ParticipacionesProyectosTableComponent },
      { path: 'paginas-colaborativas', component: PaginasColaborativasTableComponent },
      { path: 'bloques', component: BloquesTableComponent },
      { path: 'relaciones-bloques', component: RelacionesBloquesTableComponent },
      { path: 'versiones-bloques', component: VersionesBloquesTableComponent },
      { path: 'tokens-iniciales-acceso', component: TokensInicialesAccesoTableComponent },
    ]
  }
];
