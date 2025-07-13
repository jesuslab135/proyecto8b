import { Router } from 'express';
import {
  createPaginaColaborativa,
  deletePaginaColaborativa,
  getPaginaColaborativa,
  listPaginasColaborativas,
  updatePaginaColaborativa
} from './paginasColaborativasController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertPaginaColaborativaSchema,
  updatePaginaColaborativaSchema
} from '../../db/paginasColaborativasSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertPaginaColaborativaSchema), createPaginaColaborativa);
router.get('/', verifyToken, listPaginasColaborativas);
router.get('/:id', verifyToken, getPaginaColaborativa);
router.put('/:id', verifyToken, verifyAdmin, validateData(updatePaginaColaborativaSchema), updatePaginaColaborativa);
router.delete('/:id', verifyToken, verifyAdmin, deletePaginaColaborativa);

export default router;
