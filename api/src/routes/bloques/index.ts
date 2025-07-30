import { Router } from 'express';
import {
  createBloque,
  listBloquesByPage,
  updateBloque,
  deleteBloque,
} from './bloquesController';
import { verifyToken } from '../../middlewares/authMiddleware';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertBloqueSchema,
  updateBloqueSchema,
} from '../../db/bloquesSchema';

const router = Router();

// Aplica auth a todas
router.use(verifyToken);

// POST   /paginas-colaborativas/:pageId/bloques
router.post(
  '/paginas-colaborativas/:pageId/bloques',
  validateData(insertBloqueSchema),
  createBloque
);

// GET    /paginas-colaborativas/:pageId/bloques
router.get(
  '/paginas-colaborativas/:pageId/bloques',
  listBloquesByPage
);

// PUT    /bloques/:id
router.put(
  '/bloques/:id',
  validateData(updateBloqueSchema),
  updateBloque
);

// DELETE /bloques/:id
router.delete('/bloques/:id', deleteBloque);

export default router;
