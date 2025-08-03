import { Router } from 'express';
import {
  createRelacionBloque,
  deleteRelacionBloque,
  getRelacionBloque,
  listRelacionesBloques,
  updateRelacionBloque,
} from './relacionesBloquesController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertRelacionBloqueSchema,
  updateRelacionBloqueSchema,
} from '../../db/relacionesBloquesSchema';

const router = Router();

// Solo administradores pueden crear, actualizar y eliminar
router.post('/',validateData(insertRelacionBloqueSchema), createRelacionBloque);
router.get('/', listRelacionesBloques);
router.get('/:id', getRelacionBloque);
router.put('/:id',validateData(updateRelacionBloqueSchema), updateRelacionBloque);
router.delete('/:id',deleteRelacionBloque);

export default router;
