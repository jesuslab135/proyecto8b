// src/routes/versiones-bloques/index.ts
import { Router } from 'express';
import {
  createVersionBloque,
  deleteVersionBloque,
  getVersionBloque,
  listVersionesBloques,
  updateVersionBloque,
} from './versionesBloquesController';

import { validateData } from '../../middlewares/validationMiddleware';
import { insertVersionBloqueSchema, updateVersionBloqueSchema } from '../../db/versionesBloquesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertVersionBloqueSchema), createVersionBloque);
router.get('/', verifyToken, listVersionesBloques);
router.get('/:id', verifyToken, getVersionBloque);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateVersionBloqueSchema), updateVersionBloque);
router.delete('/:id', verifyToken, verifyAdmin, deleteVersionBloque);

export default router;
