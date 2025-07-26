// src/routes/collaborative-page-permissions/index.ts
import { Router } from 'express';
import {
  createCollaborativePagePermission,
  deleteCollaborativePagePermission,
  getCollaborativePagePermission,
  listCollaborativePagePermissions,
  updateCollaborativePagePermission,
} from './collaborativePagePermissionsController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertCollaborativePagePermissionSchema,
  updateCollaborativePagePermissionSchema,
} from '../../db/collaborativePagePermissionsSchema';

const router = Router();

router.post('/', validateData(insertCollaborativePagePermissionSchema), createCollaborativePagePermission);
router.get('/', listCollaborativePagePermissions);
router.get('/:id', getCollaborativePagePermission);
router.put('/:id', validateData(updateCollaborativePagePermissionSchema), updateCollaborativePagePermission);
router.delete('/:id', deleteCollaborativePagePermission);

export default router;
