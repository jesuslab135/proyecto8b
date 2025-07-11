// src/routes/oportunidades/index.ts
import { Router } from 'express';
import {
  createOportunidad,
  deleteOportunidad,
  getOportunidad,
  listOportunidades,
  updateOportunidad,
} from './oportunidadesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertOportunidadSchema,
  updateOportunidadSchema,
} from '../../db/oportunidadesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertOportunidadSchema), createOportunidad);
router.get('/', verifyToken, listOportunidades);
router.get('/:id', verifyToken, getOportunidad);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateOportunidadSchema), updateOportunidad);
router.delete('/:id', verifyToken, verifyAdmin, deleteOportunidad);

export default router;
