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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertForoSchema), createForo);
router.get('/', verifyToken, listForos);
router.get('/:id', verifyToken, getForo);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateForoSchema), updateForo);
router.delete('/:id', verifyToken, verifyAdmin, deleteForo);

export default router;
