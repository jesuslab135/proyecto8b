// src/routes/universidades/index.ts
import { Router } from 'express';
import {
  createUniversidad,
  deleteUniversidad,
  getUniversidad,
  listUniversidades,
  updateUniversidad,
} from './universidadesController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertUniversidadSchema,
  updateUniversidadSchema,
} from '../../db/universidadesSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

// Rutas protegidas con JWT
router.post(
  '/',
  verifyToken,
  verifyAdmin,
  validateData(insertUniversidadSchema),
  createUniversidad
);

router.get('/', verifyToken, listUniversidades);
router.get('/:id', verifyToken, getUniversidad);

router.put(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateData(updateUniversidadSchema),
  updateUniversidad
);

router.delete('/:id', verifyToken, verifyAdmin, deleteUniversidad);

export default router;
