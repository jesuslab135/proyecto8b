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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertPostulacionSchema), createPostulacion);
router.get('/', verifyToken, listPostulaciones);
router.get('/:id', verifyToken, getPostulacion);
router.put('/:id', verifyToken, verifyAdmin, validateData(updatePostulacionSchema), updatePostulacion);
router.delete('/:id', verifyToken, verifyAdmin, deletePostulacion);

export default router;
