// src/routes/eventos/index.ts
import { Router } from 'express';
import {
  createEvento,
  deleteEvento,
  getEvento,
  listEventos,
  updateEvento,
} from './eventosController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertEventoSchema,
  updateEventoSchema,
} from '../../db/eventosSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertEventoSchema), createEvento);
router.get('/', verifyToken, listEventos);
router.get('/:id', verifyToken, getEvento);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateEventoSchema), updateEvento);
router.delete('/:id', verifyToken, verifyAdmin, deleteEvento);

export default router;
