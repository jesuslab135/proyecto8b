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

const router = Router();

router.post('/', validateData(insertActividadUsuarioSchema), createActividadUsuario);
router.get('/', listActividadUsuario);
router.get('/:id', getActividadUsuario);
router.put('/:id', validateData(updateActividadUsuarioSchema), updateActividadUsuario);
router.delete('/:id',deleteActividadUsuario);

export default router;
