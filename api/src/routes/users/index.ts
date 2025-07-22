// src/routes/users/index.ts
import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from './usersController';
import { validateData } from '../../middlewares/validationMiddleware';
import { createUserSchema } from '../../db/usersSchema';

const router = Router();

router.post('/',validateData(createUserSchema), createUser);
router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id',validateData(createUserSchema.partial()), updateUser);
router.delete('/:id',deleteUser);

export default router;
