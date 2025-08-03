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

const router = Router();

router.post('/', validateData(insertReporteSchema), createReporte);
router.get('/', listReportes);
router.get('/:id', getReporte);
router.put('/:id', validateData(updateReporteSchema), updateReporte);
router.delete('/:id', deleteReporte);

export default router;
