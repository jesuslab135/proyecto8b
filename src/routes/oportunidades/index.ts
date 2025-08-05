// src/routes/oportunidades/index.ts
import { Router } from 'express';
import {
  createOportunidad,
  deleteOportunidad,
  getOportunidad,
  getOportunidadesByCreator,
  getOportunidadesByUniversidad,
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
router.get('/creadas-por/:userId', getOportunidadesByCreator);
router.get('/por-universidad/:universidadId', getOportunidadesByUniversidad);
router.put('/:id', validateData(updateOportunidadSchema), updateOportunidad);
router.delete('/:id', deleteOportunidad);

export default router;
