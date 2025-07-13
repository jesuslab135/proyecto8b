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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertParticipacionesProyectoSchema), createParticipacionProyecto);
router.get('/', verifyToken, listParticipacionesProyecto);
router.get('/:id', verifyToken, getParticipacionProyecto);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateParticipacionesProyectoSchema), updateParticipacionProyecto);
router.delete('/:id', verifyToken, verifyAdmin, deleteParticipacionProyecto);

export default router;
