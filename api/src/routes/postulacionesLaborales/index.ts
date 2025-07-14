// src/routes/postulacionesLaborales/index.ts
import { Router } from 'express';
import {
  createPostulacionLaboral,
  deletePostulacionLaboral,
  getPostulacionLaboral,
  listPostulacionLaboral,
  updatePostulacionLaboral,
} from './postulacionesLaboralesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertPostulacionesLaboralesSchema,
  updatePostulacionesLaboralesSchema,
} from '../../db/postulacionesLaboralesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertPostulacionesLaboralesSchema), createPostulacionLaboral);
router.get('/', verifyToken, listPostulacionLaboral);
router.get('/:id', verifyToken, getPostulacionLaboral);
router.put('/:id', verifyToken, verifyAdmin, validateData(updatePostulacionesLaboralesSchema), updatePostulacionLaboral);
router.delete('/:id', verifyToken, verifyAdmin, deletePostulacionLaboral);

export default router;