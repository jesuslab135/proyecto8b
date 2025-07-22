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


const router = Router();

router.get('/', listProyectos);
router.get('/:id', getProyecto);
router.post('/',validateData(insertProyectoSchema), createProyecto);
router.put('/:id',validateData(updateProyectoSchema), updateProyecto);
router.delete('/:id',deleteProyecto);

export default router;
