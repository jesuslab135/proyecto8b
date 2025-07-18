// src/routes/tokens-iniciales-acceso/index.ts
import { Router } from 'express';
import {
  createTokenInicialAcceso,
  deleteTokenInicialAcceso,
  getTokenInicialAcceso,
  listTokensInicialesAcceso,
  updateTokenInicialAcceso,
} from './tokensInicialesAccesoController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertTokenAccesoSchema,
  updateTokenAccesoSchema,
} from '../../db/tokensInicialesAccesoSchema';
import { verifyToken, verifyAdmin } from '../../middlewares/authMiddleware';

const router = Router();

router.post(
  '/',
  verifyToken,
  verifyAdmin,
  validateData(insertTokenAccesoSchema),
  createTokenInicialAcceso
);
router.get('/', verifyToken, listTokensInicialesAcceso);
router.get('/:id', verifyToken, getTokenInicialAcceso);
router.put(
  '/:id',
  verifyToken,
  verifyAdmin,
  validateData(updateTokenAccesoSchema),
  updateTokenInicialAcceso
);
router.delete('/:id', verifyToken, verifyAdmin, deleteTokenInicialAcceso);

export default router;
