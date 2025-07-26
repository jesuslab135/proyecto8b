// src/routes/permission-types/index.ts
import { Router } from 'express';
import {
  createPermissionType,
  deletePermissionType,
  getPermissionType,
  listPermissionTypes,
  updatePermissionType,
} from './permissionTypesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertPermissionTypeSchema,
  updatePermissionTypeSchema,
} from '../../db/permissionTypesSchema';

const router = Router();

router.post('/', validateData(insertPermissionTypeSchema), createPermissionType);
router.get('/', listPermissionTypes);
router.get('/:id', getPermissionType);
router.put('/:id', validateData(updatePermissionTypeSchema), updatePermissionType);
router.delete('/:id', deletePermissionType);

export default router;
