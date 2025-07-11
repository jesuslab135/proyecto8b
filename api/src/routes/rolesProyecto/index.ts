// src/routes/roles_proyecto/index.ts
import { Router } from 'express';
import {
  createRolProyecto,
  deleteRolProyecto,
  getRolProyecto,
  listRolesProyecto,
  updateRolProyecto,
} from './rolesProyectoController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertRolProyectoSchema,
  updateRolProyectoSchema,
} from '../../db/rolesProyectoSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertRolProyectoSchema), createRolProyecto);
router.get('/', verifyToken, listRolesProyecto);
router.get('/:id', verifyToken, getRolProyecto);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateRolProyectoSchema), updateRolProyecto);
router.delete('/:id', verifyToken, verifyAdmin, deleteRolProyecto);

export default router;
