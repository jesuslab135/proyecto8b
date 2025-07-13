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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertTaggableSchema), createTaggable);
router.get('/', verifyToken, listTaggables);
router.get('/:id', verifyToken, getTaggable);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateTaggableSchema), updateTaggable);
router.delete('/:id', verifyToken, verifyAdmin, deleteTaggable);

export default router;
