import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { search } from '../controllers/search.controller.js';

const router = Router();

router.post('/search', authenticate, search);

export default router;