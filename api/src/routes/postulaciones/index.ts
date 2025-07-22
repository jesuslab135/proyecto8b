// src/routes/oportunidades/index.ts
import { Router } from 'express';
import {
  createPostulacion,
  deletePostulacion,
  getPostulacion,
  listPostulaciones,
  updatePostulacion,
} from './postulacionesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertPostulacionSchema,
  updatePostulacionSchema,
} from '../../db/postulacionesSchema';

const router = Router();

router.post('/',validateData(insertPostulacionSchema), createPostulacion);
router.get('/', listPostulaciones);
router.get('/:id', getPostulacion);
router.put('/:id',validateData(updatePostulacionSchema), updatePostulacion);
router.delete('/:id',deletePostulacion);

export default router;
