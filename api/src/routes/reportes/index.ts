// src/routes/reportes/index.ts
import { Router } from 'express';
import {
  createReporte,
  deleteReporte,
  getReporte,
  listReportes,
  updateReporte,
} from './reportesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertReporteSchema,
  updateReporteSchema,
} from '../../db/reportesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertReporteSchema), createReporte);
router.get('/', verifyToken, listReportes);
router.get('/:id', verifyToken, getReporte);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateReporteSchema), updateReporte);
router.delete('/:id', verifyToken, verifyAdmin, deleteReporte);

export default router;
