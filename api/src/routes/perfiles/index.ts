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

const router = Router();

router.post('/',validateData(insertPerfilSchema), createPerfil);
router.get('/', listPerfiles);
router.get('/:id', getPerfil);
router.put('/:id',validateData(updatePerfilSchema), updatePerfil);
router.delete('/:id',deletePerfil);

export default router;
