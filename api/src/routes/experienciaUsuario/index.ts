// src/routes/experiencia-usuario/index.ts
import { Router } from 'express';
import {
  createExperiencia,
  deleteExperiencia,
  getExperiencia,
  listExperiencias,
  updateExperiencia,
} from './experienciaUsuarioController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertExperienciaUsuarioSchema,
  updateExperienciaUsuarioSchema,
} from '../../db/experienciaUsuarioSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertExperienciaUsuarioSchema), createExperiencia);
router.get('/', verifyToken, listExperiencias);
router.get('/:id', verifyToken, getExperiencia);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateExperienciaUsuarioSchema), updateExperiencia);
router.delete('/:id', verifyToken, verifyAdmin, deleteExperiencia);

export default router;
