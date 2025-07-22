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

const router = Router();

// Rutas protegidas con JWT
router.post(
  '/', validateData(insertUniversidadSchema),
  createUniversidad
);

router.get('/', listUniversidades);
router.get('/:id', getUniversidad);

router.put(
  '/:id', validateData(updateUniversidadSchema),
  updateUniversidad
);

router.delete('/:id',deleteUniversidad);

export default router;
