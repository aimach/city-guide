import express from 'express';

export const citiesRoutes = express.Router();

citiesRoutes.get(
   '/'
   // citiesController.getCities
);

citiesRoutes.post(
   '/'
   // citiesController.createCity
);

citiesRoutes.put(
   '/:id'
   // citiesController.updateCity
);

citiesRoutes.delete(
   '/:id'
   // citiesController.deleteCity
);
