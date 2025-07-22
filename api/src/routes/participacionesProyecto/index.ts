// src/routes/oportunidades/index.ts
import { Router } from 'express';
import {
  createParticipacionProyecto,
  deleteParticipacionProyecto,
  getParticipacionProyecto,
  listParticipacionesProyecto,
  updateParticipacionProyecto,
} from './participacionesProyectoController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertParticipacionesProyectoSchema,
  updateParticipacionesProyectoSchema,
} from '../../db/participacionesProyectoSchema';

const router = Router();

router.post('/',validateData(insertParticipacionesProyectoSchema), createParticipacionProyecto);
router.get('/', listParticipacionesProyecto);
router.get('/:id', getParticipacionProyecto);
router.put('/:id',validateData(updateParticipacionesProyectoSchema), updateParticipacionProyecto);
router.delete('/:id',deleteParticipacionProyecto);

export default router;
