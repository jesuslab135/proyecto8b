import { Router } from 'express';
import {
  createProyecto,
  deleteProyecto,
  getProyecto,
  listProyectos,
  updateProyecto,
} from './proyectosController';

import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertProyectoSchema,
  updateProyectoSchema,
} from '../../db/proyectosSchema';

import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', verifyToken, listProyectos);
router.get('/:id', verifyToken, getProyecto);
router.post('/', verifyToken, verifyAdmin, validateData(insertProyectoSchema), createProyecto);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateProyectoSchema), updateProyecto);
router.delete('/:id', verifyToken, verifyAdmin, deleteProyecto);

export default router;
