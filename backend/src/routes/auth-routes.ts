import express from 'express';
import { AuthController } from '../controllers/user-controller-bis';

export const authRoutes = express.Router();

//authRoutes.post('/login', AuthController.login);

authRoutes.post('/register', AuthController.register);
