// src/routes/report-evidences/index.ts
import { Router } from 'express';
import {
  createReportEvidence,
  deleteReportEvidence,
  getReportEvidence,
  listReportEvidences,
  updateReportEvidence,
} from './reportEvidencesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertReportEvidenceSchema,
  updateReportEvidenceSchema,
} from '../../db/reportEvidencesSchema';

const router = Router();

router.post('/', validateData(insertReportEvidenceSchema), createReportEvidence);
router.get('/', listReportEvidences);
router.get('/:id', getReportEvidence);
router.put('/:id', validateData(updateReportEvidenceSchema), updateReportEvidence);
router.delete('/:id', deleteReportEvidence);

export default router;
