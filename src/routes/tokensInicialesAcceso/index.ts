// src/routes/tokens-iniciales-acceso/index.ts
import { Router } from 'express';
import {
  createTokenInicialAcceso,
  deleteTokenInicialAcceso,
  getTokenInicialAcceso,
  listTokensInicialesAcceso,
  updateTokenInicialAcceso,
  getTokenByTokenAcceso,
} from './tokensInicialesAccesoController';
import { validateData } from '../../middlewares/validationMiddleware';
import {
  insertTokenAccesoSchema,
  updateTokenAccesoSchema,
} from '../../db/tokensInicialesAccesoSchema';

const router = Router();

router.post(
  '/',validateData(insertTokenAccesoSchema),
  createTokenInicialAcceso
);
router.get('/', listTokensInicialesAcceso);
// Primero las rutas específicas
router.get('/token-acceso', getTokenByTokenAcceso);

// Luego las rutas con parámetros dinámicos
router.get('/:id', getTokenInicialAcceso);

router.put(
  '/:id',
  validateData(updateTokenAccesoSchema),
  updateTokenInicialAcceso
);
router.delete('/:id',deleteTokenInicialAcceso);

export default router;
