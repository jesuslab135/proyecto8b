// src/routes/paginasColaborativas/index.ts
import { Router } from 'express';
import {
  createPaginaColaborativa,
  deletePaginaColaborativa,
  getPaginaColaborativa,
  listPaginasColaborativas,
  updatePaginaColaborativa
} from './paginasColaborativasController';
import { validateData } from '../../middlewares/validationMiddleware';
import { verifyToken } from '../../middlewares/authMiddleware';
import {
  insertPaginaColaborativaSchema,
  updatePaginaColaborativaSchema
} from '../../db/paginasColaborativasSchema';

const router = Router();

router.use(verifyToken);

router.post('/', validateData(insertPaginaColaborativaSchema), createPaginaColaborativa);
router.get('/', listPaginasColaborativas);
router.get('/:id', getPaginaColaborativa);
router.put('/:id', validateData(updatePaginaColaborativaSchema), updatePaginaColaborativa);
router.delete('/:id', deletePaginaColaborativa);

export default router;
