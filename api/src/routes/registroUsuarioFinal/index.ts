import { Router } from 'express';
import {
  solicitarToken,
  verificarToken,
  cambiarContrasena,
} from '../../controllers/registroUsuarioFinalController';

const router = Router();

router.post('/solicitar-token', solicitarToken);        // Paso 1
router.post('/verificar-token', verificarToken);        // Paso 2
router.post('/cambiar-contrasena', cambiarContrasena);  // Paso 3

export default router;
