import express from 'express';
import { auth } from '../middlewares/auth';

export const profileRoutes = express.Router();

profileRoutes.get(
   '/:id',
   auth
   // profileController.getOneProfile
);

profileRoutes.put(
   '/:id',
   auth
   // profileController.updateProfile
);

// Route et controller pour supprimer un profil en cas de désinscription ?
