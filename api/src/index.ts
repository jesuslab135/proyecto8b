import cors from 'cors';
import express, { json, urlencoded, Request } from 'express';
import authRoutes from './routes/auth/index';
import universidadesRoutes from './routes/universidades/index';
import forosRoutes from './routes/foros/index';
import tagsRoutes from './routes/tags/index';
import rolesUsuarioRoutes from './routes/rolesUsuario/index';
import rolesProyectoRoutes from './routes/rolesProyecto/index';
import actividadUsuarioRoutes from './routes/actividadUsuario/index';
import eventosRoutes from './routes/eventos/index';
import asistenciasEventoRoutes from './routes/asistenciasEvento/index';
import conversacionesRoutes from './routes/conversaciones/index';
import mensajesRoutes from './routes/mensajes/index';
import oportunidadesRoutes from './routes/oportunidades/index';
import hilosRoutes from './routes/hilos/index';
import experienciaUsuarioRoutes from './routes/experienciaUsuario/index';
import proyectosRoutes from './routes/proyectos/index';
import proyectosValidacionesRoutes from './routes/proyectosValidaciones/index';
import reportesRoutes from './routes/reportes/index';
import perfilesRoutes from './routes/perfiles/index';
import taggaglesRoutes from './routes/taggables/index';
import seguimientosRoutes from './routes/seguimientos/index';
import respuestasHiloRoutes from './routes/respuestasHilo/index';
import postulacionesRoutes from './routes/postulaciones/index';
import postulacionesLaboralesRoutes from './routes/postulacionesLaborales/index';
import participacionesProyectoRoutes from './routes/participacionesProyecto/index';
import paginasColaborativasRoutes from './routes/paginasColaborativas/index';
import bloquesRoutes from './routes/bloques/index';
import relacionesBloquesRoutes from './routes/relacionesBloques/index';
import versionesBloquesRoutes from './routes/versionesBloques/index';
import tokensInicialesRoutes from './routes/tokensInicialesAcceso/index';
import usuariosRoutes from './routes/usuarios/index';
import ofertasLaboralesRoutes from './routes/ofertasLaborales/index';
import { swaggerUi, swaggerSpec } from './utils/swagger';
import systemStatesRoutes from './routes/systemStates/index';
import eventTypesRoutes from './routes/eventTypes/index';
import opportunityTypesRoutes from './routes/opportunityTypes/index';
import contentTypesRoutes from './routes/contentTypes/index';
import permissionTypesRoutes from './routes/permissionTypes/index';
import workModalitiesRoutes from './routes/workModalities/index';
import experienceTypesRoutes from './routes/experienceTypes/index';
import projectTechnologiesRoutes from './routes/projectTechnologies/index';
import userSkillsRoutes from './routes/userSkills/index';
import collaborativePagePermissionsRoutes from './routes/collaborativePagePermissions/index';
import reportEvidencesRoutes from './routes/reportEvidences/index';
import validationDocumentsRoutes from './routes/validationDocuments/index';
import adminBackupRoutes from './routes/adminBackup/index';

const allowedOrigins = [
  'http://localhost:4200',
  'https://proyecto8b-production.up.railway.app',
];
const port = 3000;
const app = express();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  credentials: true,
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
  next();
});


app.use(urlencoded({ extended: false }));
app.use(
  json({
    verify: (req: Request, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/universidades', universidadesRoutes);
app.use('/api/foros', forosRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/roles-usuario', rolesUsuarioRoutes);
app.use('/api/roles-proyecto', rolesProyectoRoutes);
app.use('/api/actividad-usuario', actividadUsuarioRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/asistencias-eventos', asistenciasEventoRoutes);
app.use('/api/conversaciones', conversacionesRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/oportunidades', oportunidadesRoutes);
app.use('/api/ofertas-laborales', ofertasLaboralesRoutes);
app.use('/api/hilos', hilosRoutes);
app.use('/api/experiencia-usuario', experienciaUsuarioRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/proyectos-validaciones', proyectosValidacionesRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/perfiles', perfilesRoutes);
app.use('/api/taggables', taggaglesRoutes);
app.use('/api/seguimientos', seguimientosRoutes);
app.use('/api/respuestas-hilo', respuestasHiloRoutes);
app.use('/api/postulaciones', postulacionesRoutes);
app.use('/api/postulaciones-laborales', postulacionesLaboralesRoutes);
app.use('/api/participaciones-proyecto', participacionesProyectoRoutes);
app.use('/api/paginas-colaborativas', paginasColaborativasRoutes);
app.use('/api/bloques', bloquesRoutes);
app.use('/api/relaciones-bloques', relacionesBloquesRoutes);
app.use('/api/versiones-bloques', versionesBloquesRoutes);
app.use('/api/tokens-iniciales-acceso', tokensInicialesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/system-states', systemStatesRoutes);
app.use('/api/event-types', eventTypesRoutes);
app.use('/api/opportunity-types', opportunityTypesRoutes);
app.use('/api/content-types', contentTypesRoutes);
app.use('/api/permission-types', permissionTypesRoutes);
app.use('/api/work-modalities', workModalitiesRoutes);
app.use('/api/experience-types', experienceTypesRoutes);
app.use('/api/project-technologies', projectTechnologiesRoutes);
app.use('/api/user-skills', userSkillsRoutes);
app.use('/api/collaborative-page-permissions', collaborativePagePermissionsRoutes);
app.use('/api/report-evidences', reportEvidencesRoutes);
app.use('/api/validation-documents', validationDocumentsRoutes);
app.use('/api/admin-backup', adminBackupRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

