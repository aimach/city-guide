import express from 'express';

export const poiRoutes = express.Router();

poiRoutes.get(
   '/'
   // poiController.getPoi
);

poiRoutes.post(
   '/'
   // poiController.createPoi
);

poiRoutes.put(
   '/:id'
   // poiController.updatePoi
);

poiRoutes.delete(
   '/:id'
   // poiController.deletePoi
);
