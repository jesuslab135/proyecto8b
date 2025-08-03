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

const router = Router();

router.post('/',validateData(insertPostulacionesLaboralesSchema), createPostulacionLaboral);
router.get('/', listPostulacionLaboral);
router.get('/:id', getPostulacionLaboral);
router.put('/:id',validateData(updatePostulacionesLaboralesSchema), updatePostulacionLaboral);
router.delete('/:id',deletePostulacionLaboral);

export default router;