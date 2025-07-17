// src/routes/registroCsv/index.ts
import { Router } from 'express';
import multer from 'multer';
import { procesarCsvUsuarios, enviarTokenPorCorreo, verificarCorreoRegistro, verificarToken, actualizarContraseña } from './registroCsvController';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/upload', upload.single('file'), procesarCsvUsuarios);
router.post('/enviar-token', enviarTokenPorCorreo);
router.post('/verificar-token', verificarToken);
router.post('/cambiar-password', actualizarContraseña);

export default router;
