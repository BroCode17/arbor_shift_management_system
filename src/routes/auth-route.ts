import express from 'express';

import authController from '../controllers/auth-controller';
import { rateLimitMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/auth/login', rateLimitMiddleware, authController.login);
router.post('/auth/register', authController.register);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authController.logout);

export default router;