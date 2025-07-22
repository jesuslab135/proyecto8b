// src/routes/foros/index.ts
import { Router } from 'express';
import {
  createForo,
  deleteForo,
  getForo,
  listForos,
  updateForo,
} from './forosController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertForoSchema,
  updateForoSchema,
} from '../../db/forosSchema';

const router = Router();

router.post('/',validateData(insertForoSchema), createForo);
router.get('/', listForos);
router.get('/:id', getForo);
router.put('/:id',validateData(updateForoSchema), updateForo);
router.delete('/:id',deleteForo);

export default router;
