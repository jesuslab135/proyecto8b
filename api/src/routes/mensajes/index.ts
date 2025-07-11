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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertMensajeSchema), createMensaje);
router.get('/', verifyToken, listMensajes);
router.get('/:id', verifyToken, getMensaje);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateMensajeSchema), updateMensaje);
router.delete('/:id', verifyToken, verifyAdmin, deleteMensaje);

export default router;
