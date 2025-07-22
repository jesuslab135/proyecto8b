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

const router = Router();

router.post('/',validateData(insertExperienciaUsuarioSchema), createExperiencia);
router.get('/', listExperiencias);
router.get('/:id', getExperiencia);
router.put('/:id',validateData(updateExperienciaUsuarioSchema), updateExperiencia);
router.delete('/:id',deleteExperiencia);

export default router;
