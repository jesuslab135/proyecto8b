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


const router = Router();

router.post('/',validateData(insertSeguimientoSchema), createSeguimiento);
router.get('/', listSeguimientos);
router.get('/:id', getSeguimiento);
router.put('/:id',validateData(updateSeguimientoSchema), updateSeguimiento);
router.delete('/:id',deleteSeguimiento);

export default router;
