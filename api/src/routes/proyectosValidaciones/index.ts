import { Router } from 'express';
import {
  createProyectoValidacion,
  deleteProyectoValidacion,
  getProyectoValidacion,
  listProyectosValidaciones,
  updateProyectoValidacion,
} from './proyectosValidacionesController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertProyectoValidacionSchema,
  updateProyectoValidacionSchema,
} from '../../db/proyectosValidacionesSchema';

import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

// Protegidas
router.get('/', verifyToken, listProyectosValidaciones);
router.get('/:id', verifyToken, getProyectoValidacion);

// Solo admins pueden modificar
router.post(
  '/',
  verifyToken,
  verifyAdmin,
  validateData(insertProyectoValidacionSchema),
  createProyectoValidacion
);

router.put(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateData(updateProyectoValidacionSchema),
  updateProyectoValidacion
);

router.delete('/:id', verifyToken, verifyAdmin, deleteProyectoValidacion);

export default router;
