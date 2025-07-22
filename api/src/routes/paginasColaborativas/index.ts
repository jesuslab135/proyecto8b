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

const router = Router();

router.post('/',validateData(insertPaginaColaborativaSchema), createPaginaColaborativa);
router.get('/', listPaginasColaborativas);
router.get('/:id', getPaginaColaborativa);
router.put('/:id',validateData(updatePaginaColaborativaSchema), updatePaginaColaborativa);
router.delete('/:id',deletePaginaColaborativa);

export default router;
