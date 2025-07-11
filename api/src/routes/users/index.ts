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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(createUserSchema), createUser);
router.get('/', verifyToken, listUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, verifyAdmin, validateData(createUserSchema.partial()), updateUser);
router.delete('/:id', verifyToken, verifyAdmin, deleteUser);

export default router;
