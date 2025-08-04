import { Router } from 'express';
import { handleContactForm } from './contactController';

const router = Router();

router.post('/', handleContactForm);

export default router;
