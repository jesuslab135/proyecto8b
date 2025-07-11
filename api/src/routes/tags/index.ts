// src/routes/tags/index.ts
import { Router } from 'express';
import {
  createTag,
  deleteTag,
  getTag,
  listTags,
  updateTag,
} from './tagsController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertTagSchema,
  updateTagSchema,
} from '../../db/tagsSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertTagSchema), createTag);
router.get('/', verifyToken, listTags);
router.get('/:id', verifyToken, getTag);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateTagSchema), updateTag);
router.delete('/:id', verifyToken, verifyAdmin, deleteTag);

export default router;
