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

const router = Router();

router.post('/', validateData(insertEventoSchema), createEvento);
router.get('/', listEventos);
router.get('/:id', getEvento);
router.put('/:id', validateData(updateEventoSchema), updateEvento);
router.delete('/:id', deleteEvento);

export default router;
