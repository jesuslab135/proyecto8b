// src/routes/bloques/index.ts
import { Router } from 'express';
import {
  createBloque,
  deleteBloque,
  getBloque,
  listBloques,
  updateBloque,
} from './bloquesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertBloqueSchema,
  updateBloqueSchema,
} from '../../db/bloquesSchema';

const router = Router();

router.post('/',validateData(insertBloqueSchema), createBloque);
router.get('/', listBloques);
router.get('/:id', getBloque);
router.put('/:id',validateData(updateBloqueSchema), updateBloque);
router.delete('/:id',deleteBloque);

export default router;
