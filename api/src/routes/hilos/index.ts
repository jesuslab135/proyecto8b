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

const router = Router();

router.post('/',validateData(insertHiloSchema), createHilo);
router.get('/', listHilos);
router.get('/:id', getHilo);
router.put('/:id',validateData(updateHiloSchema), updateHilo);
router.delete('/:id',deleteHilo);

export default router;
