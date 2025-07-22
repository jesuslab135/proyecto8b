// src/routes/ofertasLaborales/index.ts
import { Router } from 'express';
import {
  createOfertaLaboral,
  deleteOfertaLaboral,
  getOfertaLaboral,
  listOfertaLaboral,
  updateOfertaLaboral,
} from './ofertasLaboralesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertOfertasLaboralesSchema,
  updateOfertasLaboralesSchema,
} from '../../db/ofertasLaboralesSchema';

const router = Router();

router.post('/',validateData(insertOfertasLaboralesSchema), createOfertaLaboral);
router.get('/', listOfertaLaboral);
router.get('/:id', getOfertaLaboral);
router.put('/:id',validateData(updateOfertasLaboralesSchema), updateOfertaLaboral);
router.delete('/:id',deleteOfertaLaboral);

export default router;