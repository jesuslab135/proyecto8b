// src/routes/adminBackup/index.ts
import { Router } from 'express';
import { runBackupBat, backupPartial, restoreFull, restorePartial, exportCsv } from './adminBackupController';
import { verifyToken } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/execute-bat', verifyToken, runBackupBat);
router.post('/partial', verifyToken, backupPartial);
router.post('/restore-full', verifyToken, restoreFull);
router.post('/restore-partial', verifyToken, restorePartial);
router.get('/export-csv/:table', verifyToken, exportCsv);

export default router;
