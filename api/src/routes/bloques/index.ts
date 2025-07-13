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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertBloqueSchema), createBloque);
router.get('/', verifyToken, listBloques);
router.get('/:id', verifyToken, getBloque);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateBloqueSchema), updateBloque);
router.delete('/:id', verifyToken, verifyAdmin, deleteBloque);

export default router;
