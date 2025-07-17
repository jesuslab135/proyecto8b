import { Router } from 'express';
import multer from 'multer';
import { registrarUsuariosDesdeCSV } from '../../controllers/registroUniversidadController';
import { universidadAuth } from '../../middlewares/universidadAuth';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', universidadAuth, upload.single('archivo'), registrarUsuariosDesdeCSV);

export default router;
