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

const router = Router();

router.post('/',validateData(insertConversacionSchema), createConversacion);
router.get('/', listConversaciones);
router.get('/:id', getConversacion);
router.delete('/:id',deleteConversacion);

export default router;
