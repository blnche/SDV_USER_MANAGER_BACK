import express from 'express';
import UserController from '../controllers/userController.js';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', AuthMiddleware, UserController.getAll);
router.get('/:id', AuthMiddleware, UserController.getUserById);
router.put('/:id', AuthMiddleware, UserController.updateUser);
router.delete('/:id', AuthMiddleware, UserController.deleteUser);

export default router;
