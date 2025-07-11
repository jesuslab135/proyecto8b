// src/routes/actividad_usuario/index.ts
import { Router } from 'express';
import {
  createActividadUsuario,
  deleteActividadUsuario,
  getActividadUsuario,
  listActividadUsuario,
  updateActividadUsuario,
} from './actividadUsuarioController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertActividadUsuarioSchema,
  updateActividadUsuarioSchema,
} from '../../db/actividadUsuarioSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertActividadUsuarioSchema), createActividadUsuario);
router.get('/', verifyToken, listActividadUsuario);
router.get('/:id', verifyToken, getActividadUsuario);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateActividadUsuarioSchema), updateActividadUsuario);
router.delete('/:id', verifyToken, verifyAdmin, deleteActividadUsuario);

export default router;
