// src/routes/mensajes/index.ts
import { Router } from 'express';
import {
  createMensaje,
  deleteMensaje,
  getMensaje,
  listMensajes,
  updateMensaje,
} from './mensajesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertMensajeSchema,
  updateMensajeSchema,
} from '../../db/mensajesSchema';

const router = Router();

router.post('/',validateData(insertMensajeSchema), createMensaje);
router.get('/', listMensajes);
router.get('/:id', getMensaje);
router.put('/:id',validateData(updateMensajeSchema), updateMensaje);
router.delete('/:id',deleteMensaje);

export default router;
