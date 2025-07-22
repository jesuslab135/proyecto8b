// src/routes/oportunidades/index.ts
import { Router } from 'express';
import {
  createOportunidad,
  deleteOportunidad,
  getOportunidad,
  listOportunidades,
  updateOportunidad,
} from './oportunidadesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertOportunidadSchema,
  updateOportunidadSchema,
} from '../../db/oportunidadesSchema';

const router = Router();

router.post('/', validateData(insertOportunidadSchema), createOportunidad);
router.get('/', listOportunidades);
router.get('/:id', getOportunidad);
router.put('/:id', validateData(updateOportunidadSchema), updateOportunidad);
router.delete('/:id', deleteOportunidad);

export default router;
