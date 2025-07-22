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


const router = Router();

// Protegidas
router.get('/', listProyectosValidaciones);
router.get('/:id', getProyectoValidacion);

// Solo admins pueden modificar
router.post(
  '/',validateData(insertProyectoValidacionSchema),
  createProyectoValidacion
);

router.put(
  '/:id',validateData(updateProyectoValidacionSchema),
  updateProyectoValidacion
);

router.delete('/:id',deleteProyectoValidacion);

export default router;
