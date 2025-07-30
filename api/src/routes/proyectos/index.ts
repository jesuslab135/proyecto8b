 import { Router } from 'express';
 import { verifyToken } from '../../middlewares/authMiddleware';
 import { getPermisoProyecto } from './proyectosController';

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

// Endpoint para obtener permiso de un usuario sobre un proyecto
router.get(
  '/:projectId/permiso/:userId',
  verifyToken,
  getPermisoProyecto
);

 router.get('/', listProyectos);
 router.get('/:id', getProyecto);
 router.post('/', validateData(insertProyectoSchema), createProyecto);
 router.put('/:id', validateData(updateProyectoSchema), updateProyecto);
 router.delete('/:id', deleteProyecto);

 export default router;
