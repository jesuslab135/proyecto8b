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
import { ,  } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/',validateData(insertVersionBloqueSchema), createVersionBloque);
router.get('/', , listVersionesBloques);
router.get('/:id', , getVersionBloque);
router.put('/:id',validateData(updateVersionBloqueSchema), updateVersionBloque);
router.delete('/:id',deleteVersionBloque);

export default router;
