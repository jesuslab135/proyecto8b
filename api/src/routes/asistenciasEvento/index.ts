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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertAsistenciaEventoSchema), createAsistenciaEvento);
router.get('/', verifyToken, listAsistenciasEvento);
router.get('/:id', verifyToken, getAsistenciaEvento);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateAsistenciaEventoSchema), updateAsistenciaEvento);
router.delete('/:id', verifyToken, verifyAdmin, deleteAsistenciaEvento);

export default router;
