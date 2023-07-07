import express from 'express';
import { auth } from '../middlewares/auth';
export const poiRoutes = express.Router();

poiRoutes.get(
   '/'
   // poiController.getPoi
);

poiRoutes.post(
   '/',
   auth
   // poiController.createPoi
);

poiRoutes.put(
   '/:id',
   auth
   // poiController.updatePoi
);

poiRoutes.delete(
   '/:id',
   auth
   // poiController.deletePoi
);
