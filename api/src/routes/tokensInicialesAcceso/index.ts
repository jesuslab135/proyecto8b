// src/routes/tokens-iniciales-acceso/index.ts
import { Router } from 'express';
import {
  createTokenInicialAcceso,
  deleteTokenInicialAcceso,
  getTokenInicialAcceso,
  listTokensInicialesAcceso,
  updateTokenInicialAcceso,
  getTokenByTokenAcceso,
  getTokenByUsuarioId,
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
router.get('/all', listTokensInicialesAcceso);
router.get('/token-acceso', getTokenByTokenAcceso); // ✅ Ruta clara y sin conflicto
router.get('/usuario/:usuarioId', getTokenByUsuarioId); // ✅ Ruta específica
router.get('/:id', getTokenInicialAcceso); 
router.put(
  '/:id',
  validateData(updateTokenAccesoSchema),
  updateTokenInicialAcceso
);
router.delete('/:id',deleteTokenInicialAcceso);


export default router;
