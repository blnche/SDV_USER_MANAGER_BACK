import express from 'express';
import userRoutes from './users.js';
import authRoutes from './auth.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

router.use('/auth', authRoutes);
router.use('/users', AuthMiddleware, userRoutes);

export default router;
