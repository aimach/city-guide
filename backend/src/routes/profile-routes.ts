import express from 'express';

export const profileRoutes = express.Router();

profileRoutes.get(
   '/:id'
   // profileController.getOneProfile
);

profileRoutes.put(
   '/:id'
   // profileController.updateProfile
);

// Route et controller pour supprimer un profil en cas de désinscription ?
profileRoutes.delete(
   ':/id'
   // profileController.deleteProfile
);
