// src/routes/asistencias_evento/index.ts
import { Router } from 'express';
import {
  createAsistenciaEvento,
  deleteAsistenciaEvento,
  getAsistenciaEvento,
  listAsistenciasEvento,
  updateAsistenciaEvento,
} from './asistenciasEventoController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertAsistenciaEventoSchema,
  updateAsistenciaEventoSchema,
} from '../../db/asistenciasEventoSchema';

const router = Router();

router.post('/',validateData(insertAsistenciaEventoSchema), createAsistenciaEvento);
router.get('/', listAsistenciasEvento);
router.get('/:id', getAsistenciaEvento);
router.put('/:id',validateData(updateAsistenciaEventoSchema), updateAsistenciaEvento);
router.delete('/:id',deleteAsistenciaEvento);

export default router;
