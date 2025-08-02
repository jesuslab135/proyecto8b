// src/routes/event-types/index.ts
import { Router } from 'express';
import {
  createEventType,
  deleteEventType,
  getEventType,
  listEventTypes,
  updateEventType,
} from './eventTypesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertEventTypeSchema,
  updateEventTypeSchema,
} from '../../db/eventTypesSchema';

const router = Router();

router.post('/', validateData(insertEventTypeSchema), createEventType);
router.get('/', listEventTypes);
router.get('/:id', getEventType);
router.put('/:id', validateData(updateEventTypeSchema), updateEventType);
router.delete('/:id', deleteEventType);

export default router;
