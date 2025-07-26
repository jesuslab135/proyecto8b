// src/routes/validation-documents/index.ts
import { Router } from 'express';
import {
  createValidationDocument,
  deleteValidationDocument,
  getValidationDocument,
  listValidationDocuments,
  updateValidationDocument,
} from './validationDocumentsController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertValidationDocumentSchema,
  updateValidationDocumentSchema,
} from '../../db/validationDocumentsSchema';

const router = Router();

router.post('/', validateData(insertValidationDocumentSchema), createValidationDocument);
router.get('/', listValidationDocuments);
router.get('/:id', getValidationDocument);
router.put('/:id', validateData(updateValidationDocumentSchema), updateValidationDocument);
router.delete('/:id', deleteValidationDocument);

export default router;
