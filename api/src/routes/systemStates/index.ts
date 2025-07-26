// src/routes/system-states/index.ts
import { Router } from 'express';
import {
  createSystemState,
  deleteSystemState,
  getSystemState,
  listSystemStates,
  updateSystemState,
} from './systemStatesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertSystemStateSchema,
  updateSystemStateSchema,
} from '../../db/systemStatesSchema';

const router = Router();

router.post('/', validateData(insertSystemStateSchema), createSystemState);
router.get('/', listSystemStates);
router.get('/:id', getSystemState);
router.put('/:id', validateData(updateSystemStateSchema), updateSystemState);
router.delete('/:id', deleteSystemState);

export default router;
