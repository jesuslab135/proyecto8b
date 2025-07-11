// src/routes/conversaciones/index.ts
import { Router } from 'express';
import {
  createConversacion,
  deleteConversacion,
  getConversacion,
  listConversaciones,
} from './conversacionesController';
import { validateData } from '../../middlewares/validationMiddleware';
import { insertConversacionSchema } from '../../db/conversacionesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertConversacionSchema), createConversacion);
router.get('/', verifyToken, listConversaciones);
router.get('/:id', verifyToken, getConversacion);
router.delete('/:id', verifyToken, verifyAdmin, deleteConversacion);

export default router;
