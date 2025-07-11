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

const port = 3000;
const app = express();

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

app.use('/products', productsRoutes);
app.use('/auth', authRoutes);
app.use('/orders', ordersRoutes);
app.use('/universidades', universidadesRoutes);
app.use('/foros', forosRoutes);
app.use('/tags', tagsRoutes);
app.use('/roles-usuario', rolesUsuarioRoutes);
app.use('/roles-proyecto', rolesProyectoRoutes);
app.use('/actividad-usuario', actividadUsuarioRoutes);
app.use('/eventos', eventosRoutes);
app.use('/asistencias-eventos', asistenciasEventoRoutes);
app.use('/conversaciones', conversacionesRoutes);
app.use('/users', usersRoutes);
app.use('/mensajes', mensajesRoutes);
app.use('/oportunidades', oportunidadesRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

