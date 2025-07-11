// src/routes/roles_usuario/index.ts
import { Router } from 'express';
import {
  createRolUsuario,
  deleteRolUsuario,
  getRolUsuario,
  listRolesUsuario,
  updateRolUsuario,
} from './rolesUsuarioController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertRolUsuarioSchema,
  updateRolUsuarioSchema,
} from '../../db/rolesUsuarioSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertRolUsuarioSchema), createRolUsuario);
router.get('/', verifyToken, listRolesUsuario);
router.get('/:id', verifyToken, getRolUsuario);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateRolUsuarioSchema), updateRolUsuario);
router.delete('/:id', verifyToken, verifyAdmin, deleteRolUsuario);

export default router;
