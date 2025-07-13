// src/routes/hilos/index.ts
import { Router } from 'express';
import {
  createHilo,
  deleteHilo,
  getHilo,
  listHilos,
  updateHilo,
} from './hilosController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertHiloSchema,
  updateHiloSchema,
} from '../../db/hilosSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertHiloSchema), createHilo);
router.get('/', verifyToken, listHilos);
router.get('/:id', verifyToken, getHilo);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateHiloSchema), updateHilo);
router.delete('/:id', verifyToken, verifyAdmin, deleteHilo);

export default router;
