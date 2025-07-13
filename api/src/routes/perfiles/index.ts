import { Router } from 'express';
import {
  createPerfil,
  listPerfiles,
  getPerfil,
  updatePerfil,
  deletePerfil
} from './perfilesController';

import { insertPerfilSchema, updatePerfilSchema } from '../../db/perfilesSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertPerfilSchema), createPerfil);
router.get('/', verifyToken, listPerfiles);
router.get('/:id', verifyToken, getPerfil);
router.put('/:id', verifyToken, verifyAdmin, validateData(updatePerfilSchema), updatePerfil);
router.delete('/:id', verifyToken, verifyAdmin, deletePerfil);

export default router;
