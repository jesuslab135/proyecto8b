// src/routes/proyectosValidaciones/index.ts
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

// Rutas públicas (todos pueden consultar)
router.get('/', listProyectosValidaciones);
router.get('/:id', getProyectoValidacion);

// Rutas protegidas (solo administradores pueden crear, actualizar o eliminar)
router.post('/', validateData(insertProyectoValidacionSchema), createProyectoValidacion);
router.put('/:id', validateData(updateProyectoValidacionSchema), updateProyectoValidacion);
router.delete('/:id', deleteProyectoValidacion);

export default router;
