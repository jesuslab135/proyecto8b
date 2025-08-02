import { Router } from 'express';
import {
  createRespuestaHilo,
  deleteRespuestaHilo,
  getRespuestaHilo,
  listRespuestasHilo,
  updateRespuestaHilo,
} from './respuestasHiloController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertRespuestaHiloSchema,
  updateRespuestaHiloSchema,
} from '../../db/respuestasHiloSchema';

const router = Router();

router.post('/',validateData(insertRespuestaHiloSchema), createRespuestaHilo);
router.get('/', listRespuestasHilo);
router.get('/:id', getRespuestaHilo);
router.put('/:id',validateData(updateRespuestaHiloSchema), updateRespuestaHilo);
router.delete('/:id',deleteRespuestaHilo);

export default router;
