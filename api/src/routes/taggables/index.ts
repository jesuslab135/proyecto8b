import { Router } from 'express';
import {
  createTaggable,
  deleteTaggable,
  getTaggable,
  listTaggables,
  updateTaggable,
} from './taggablesController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertTaggableSchema,
  updateTaggableSchema,
} from '../../db/taggablesSchema';

const router = Router();

router.post('/',validateData(insertTaggableSchema), createTaggable);
router.get('/', listTaggables);
router.get('/:id', getTaggable);
router.put('/:id',validateData(updateTaggableSchema), updateTaggable);
router.delete('/:id',deleteTaggable);

export default router;
