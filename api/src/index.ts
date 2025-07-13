import cors from 'cors';
import express, { json, urlencoded, Request } from 'express';
import productsRoutes from './routes/products/index';
import authRoutes from './routes/auth/index';
import ordersRoutes from './routes/orders/index';
import universidadesRoutes from './routes/universidades/index';
import forosRoutes from './routes/foros/index';
import tagsRoutes from './routes/tags/index';
import rolesUsuarioRoutes from './routes/rolesUsuario/index';
import rolesProyectoRoutes from './routes/rolesProyecto/index';
import actividadUsuarioRoutes from './routes/actividadUsuario/index';
import eventosRoutes from './routes/eventos/index';
import asistenciasEventoRoutes from './routes/asistenciasEvento/index';
import conversacionesRoutes from './routes/conversaciones/index';
import usersRoutes from './routes/users/index';
import mensajesRoutes from './routes/mensajes/index';
import oportunidadesRoutes from './routes/oportunidades/index';
import hilosRoutes from './routes/hilos/index';
import experienciaUsuarioRoutes from './routes/experienciaUsuario/index';
import proyectosRoutes from './routes/proyectos/index';
import proyectosValidacionesRoutes from './routes/proyectosValidaciones/index';
import reportesRoutes from './routes/reportes/index';
import perfilesRoutes from './routes/perfiles/index';
import taggaglesRoutes from './routes/taggables/index';

const port = 3000;
const app = express();
app.use(cors({
  origin: 'http://localhost:4200',
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

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/universidades', universidadesRoutes);
app.use('/api/foros', forosRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/roles-usuario', rolesUsuarioRoutes);
app.use('/api/roles-proyecto', rolesProyectoRoutes);
app.use('/api/actividad-usuario', actividadUsuarioRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/asistencias-eventos', asistenciasEventoRoutes);
app.use('/api/conversaciones', conversacionesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/oportunidades', oportunidadesRoutes);
app.use('/api/hilos', hilosRoutes);
app.use('/api/experiencia-usuario', experienciaUsuarioRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/proyectos-validaciones', proyectosValidacionesRoutes);
app.use('/api/reportes', reportesRoutes);
app.use('/api/perfiles', perfilesRoutes);
app.use('/api/taggables', taggaglesRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

