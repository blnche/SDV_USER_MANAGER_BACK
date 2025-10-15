import express from 'express';
import UserController from '../controllers/userController.js';
import AuthController from '../controllers/authController.js';

const router = express.Router();

router.get('/me', AuthController.loggedUser);

router.get('/', UserController.getAll);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
