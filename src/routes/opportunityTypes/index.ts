// src/routes/opportunity-types/index.ts
import { Router } from 'express';
import {
  createOpportunityType,
  deleteOpportunityType,
  getOpportunityType,
  listOpportunityTypes,
  updateOpportunityType,
} from './opportunityTypesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertOpportunityTypeSchema,
  updateOpportunityTypeSchema,
} from '../../db/opportunityTypesSchema';

const router = Router();

router.post('/', validateData(insertOpportunityTypeSchema), createOpportunityType);
router.get('/', listOpportunityTypes);
router.get('/:id', getOpportunityType);
router.put('/:id', validateData(updateOpportunityTypeSchema), updateOpportunityType);
router.delete('/:id', deleteOpportunityType);

export default router;
