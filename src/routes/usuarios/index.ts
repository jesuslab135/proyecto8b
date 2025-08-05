// src/routes/usuarios/index.ts
import { Router } from 'express';
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  listUsuarios,
  updateUsuario,
  createAlumnoByAdminUni
} from './usuariosController';
import { validateData } from '../../middlewares/validationMiddleware';
import { insertUsuarioSchema, updateUsuarioSchema, iUAdminUniSchema } from '../../db/usuariosSchema';

const router = Router();

router.post('/', validateData(insertUsuarioSchema), createUsuario);
router.post('/alumnos', validateData(iUAdminUniSchema), createAlumnoByAdminUni);
router.get('/', listUsuarios);
router.get('/:id', getUsuario);
router.put('/:id', validateData(updateUsuarioSchema), updateUsuario);
router.delete('/:id', deleteUsuario);

export default router;
