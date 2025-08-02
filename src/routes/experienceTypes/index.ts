// src/routes/experience-types/index.ts
import { Router } from 'express';
import {
  createExperienceType,
  deleteExperienceType,
  getExperienceType,
  listExperienceTypes,
  updateExperienceType,
} from './experienceTypesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertExperienceTypeSchema,
  updateExperienceTypeSchema,
} from '../../db/experienceTypesSchema';

const router = Router();

router.post('/', validateData(insertExperienceTypeSchema), createExperienceType);
router.get('/', listExperienceTypes);
router.get('/:id', getExperienceType);
router.put('/:id', validateData(updateExperienceTypeSchema), updateExperienceType);
router.delete('/:id', deleteExperienceType);

export default router;
