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

const router = Router();

router.post('/',validateData(insertTagSchema), createTag);
router.get('/', listTags);
router.get('/:id', getTag);
router.put('/:id',validateData(updateTagSchema), updateTag);
router.delete('/:id',deleteTag);

export default router;
