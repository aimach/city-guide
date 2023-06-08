import express from 'express';

export const authRoutes = express.Router();

authRoutes.post(
   '/login'
   // authController.login
);

authRoutes.post(
   '/register'
   // authController.register
);
