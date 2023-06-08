import express from 'express';

export const categoriesRoutes = express.Router();

categoriesRoutes.get(
   '/'
   // categoriesController.getCategories
);

categoriesRoutes.post(
   '/'
   // categoriesController.createCategory
);

categoriesRoutes.put(
   '/:id'
   // categoriesController.updateCategory
);

categoriesRoutes.delete(
   '/:id'
   // categoriesController.deleteCategory
);
