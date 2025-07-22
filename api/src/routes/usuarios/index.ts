import { Router } from 'express';
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  listUsuarios,
  updateUsuario
} from './usuariosController';
import { validateData } from '../../middlewares/validationMiddleware';
import { insertUsuarioSchema, updateUsuarioSchema } from '../../db/usuariosSchema';
import { ,  } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/',validateData(insertUsuarioSchema), createUsuario);
router.get('/', , listUsuarios);
router.get('/:id', , getUsuario);
router.put('/:id',validateData(updateUsuarioSchema), updateUsuario);
router.delete('/:id',deleteUsuario);

export default router;
