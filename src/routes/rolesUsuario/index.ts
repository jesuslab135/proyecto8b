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

const router = Router();

router.post('/',validateData(insertRolUsuarioSchema), createRolUsuario);
router.get('/', listRolesUsuario);
router.get('/:id', getRolUsuario);
router.put('/:id',validateData(updateRolUsuarioSchema), updateRolUsuario);
router.delete('/:id',deleteRolUsuario);

export default router;
