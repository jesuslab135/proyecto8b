// src/routes/project-technologies/index.ts
import { Router } from 'express';
import {
  createProjectTechnology,
  deleteProjectTechnology,
  getProjectTechnology,
  listProjectTechnologies,
  updateProjectTechnology,
} from './projectTechnologiesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertProjectTechnologySchema,
  updateProjectTechnologySchema,
} from '../../db/projectTechnologiesSchema';

const router = Router();

router.post('/', validateData(insertProjectTechnologySchema), createProjectTechnology);
router.get('/', listProjectTechnologies);
router.get('/:id', getProjectTechnology);
router.put('/:id', validateData(updateProjectTechnologySchema), updateProjectTechnology);
router.delete('/:id', deleteProjectTechnology);

export default router;
