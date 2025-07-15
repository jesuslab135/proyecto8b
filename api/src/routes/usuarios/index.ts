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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertUsuarioSchema), createUsuario);
router.get('/', verifyToken, listUsuarios);
router.get('/:id', verifyToken, getUsuario);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateUsuarioSchema), updateUsuario);
router.delete('/:id', verifyToken, verifyAdmin, deleteUsuario);

export default router;
