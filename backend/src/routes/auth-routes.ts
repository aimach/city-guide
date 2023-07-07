import express from 'express';
import { AuthController } from '../controllers/user-controller';
import { limiter } from '../middlewares/limiter';

export const authRoutes = express.Router();

authRoutes.post('/login', limiter, AuthController.login);

authRoutes.post('/register', limiter, AuthController.register);
