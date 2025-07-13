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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertOfertasLaboralesSchema), createOfertaLaboral);
router.get('/', verifyToken, listOfertaLaboral);
router.get('/:id', verifyToken, getOfertaLaboral);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateOfertasLaboralesSchema), updateOfertaLaboral);
router.delete('/:id', verifyToken, verifyAdmin, deleteOfertaLaboral);

export default router;