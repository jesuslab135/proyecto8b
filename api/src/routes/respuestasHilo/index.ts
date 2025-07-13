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
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', verifyToken, verifyAdmin, validateData(insertRespuestaHiloSchema), createRespuestaHilo);
router.get('/', verifyToken, listRespuestasHilo);
router.get('/:id', verifyToken, getRespuestaHilo);
router.put('/:id', verifyToken, verifyAdmin, validateData(updateRespuestaHiloSchema), updateRespuestaHilo);
router.delete('/:id', verifyToken, verifyAdmin, deleteRespuestaHilo);

export default router;
