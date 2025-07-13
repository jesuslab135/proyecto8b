// src/routes/seguimientos/index.ts
import { Router } from 'express';
import {
  createSeguimiento,
  deleteSeguimiento,
  getSeguimiento,
  listSeguimientos,
  updateSeguimiento
} from './seguimientosController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertSeguimientoSchema,
  updateSeguimientoSchema
} from '../../db/seguimientosSchema';

import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertSeguimientoSchema), createSeguimiento);
router.get('/', verifyToken, listSeguimientos);
router.get('/:id', verifyToken, getSeguimiento);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateSeguimientoSchema), updateSeguimiento);
router.delete('/:id', verifyToken, verifyAdmin, deleteSeguimiento);

export default router;
