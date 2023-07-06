import express from 'express';
import { auth } from '../middlewares/auth';
export const categoriesRoutes = express.Router();

categoriesRoutes.get(
   '/',
   auth
   // categoriesController.getCategories
);

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
