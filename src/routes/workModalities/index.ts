// src/routes/work-modalities/index.ts
import { Router } from 'express';
import {
  createWorkModality,
  deleteWorkModality,
  getWorkModality,
  listWorkModalities,
  updateWorkModality,
} from './workModalitiesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertWorkModalitySchema,
  updateWorkModalitySchema,
} from '../../db/workModalitiesSchema';

const router = Router();

router.post('/', validateData(insertWorkModalitySchema), createWorkModality);
router.get('/', listWorkModalities);
router.get('/:id', getWorkModality);
router.put('/:id', validateData(updateWorkModalitySchema), updateWorkModality);
router.delete('/:id', deleteWorkModality);

export default router;
