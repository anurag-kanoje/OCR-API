import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { processImage } from '../controllers/ocr.controller.js';

const router = Router();

router.post(
  '/process',
  authenticate,
  upload.single('image'),
  processImage
);

export default router;