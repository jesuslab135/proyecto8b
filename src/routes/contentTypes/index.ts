// src/routes/content-types/index.ts
import { Router } from 'express';
import {
  createContentType,
  deleteContentType,
  getContentType,
  listContentTypes,
  updateContentType,
} from './contentTypesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertContentTypeSchema,
  updateContentTypeSchema,
} from '../../db/contentTypesSchema';

const router = Router();

router.post('/', validateData(insertContentTypeSchema), createContentType);
router.get('/', listContentTypes);
router.get('/:id', getContentType);
router.put('/:id', validateData(updateContentTypeSchema), updateContentType);
router.delete('/:id', deleteContentType);

export default router;
