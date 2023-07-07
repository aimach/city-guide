import express from 'express';
import { auth } from '../middlewares/auth';
export const citiesRoutes = express.Router();

citiesRoutes.get(
   '/',
   auth
   // citiesController.getCities
);

citiesRoutes.post(
   '/',
   auth
   // citiesController.createCity
);

citiesRoutes.put(
   '/:id',
   auth
   // citiesController.updateCity
);

citiesRoutes.delete(
   '/:id',
   auth
   // citiesController.deleteCity
);
