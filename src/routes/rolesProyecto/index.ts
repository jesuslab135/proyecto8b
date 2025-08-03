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

const router = Router();

router.post('/',validateData(insertRolProyectoSchema), createRolProyecto);
router.get('/', listRolesProyecto);
router.get('/:id', getRolProyecto);
router.put('/:id',validateData(updateRolProyectoSchema), updateRolProyecto);
router.delete('/:id',deleteRolProyecto);

export default router;
