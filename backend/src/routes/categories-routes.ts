import express from 'express';
import { auth } from '../middlewares/auth';
export const categoriesRoutes = express.Router();
import * as categoriesController from '../controllers/categorie-controller';

categoriesRoutes.get('/', (req, res) => {
   res.send('Success');
});

categoriesRoutes.post(
   '/',
   auth
   // categoriesController.createCategory
);

categoriesRoutes.put(
   '/:id',
   auth
   // categoriesController.updateCategory
);

categoriesRoutes.delete(
   '/:id',
   auth
   // categoriesController.deleteCategory
);
