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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

// Solo administradores pueden crear, actualizar y eliminar
router.post('/', verifyToken, verifyAdmin, validateData(insertRelacionBloqueSchema), createRelacionBloque);
router.get('/', verifyToken, listRelacionesBloques);
router.get('/:id', verifyToken, getRelacionBloque);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateRelacionBloqueSchema), updateRelacionBloque);
router.delete('/:id', verifyToken, verifyAdmin, deleteRelacionBloque);

export default router;
