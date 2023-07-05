import express from "express";
import CategoryController from "../controllers/categoryController";

export const categoriesRoutes = express.Router();

const categoryController = new CategoryController();

categoriesRoutes.get("/", categoryController.getCategories);

categoriesRoutes.get("/:id", categoryController.getOneCategory);

categoriesRoutes.post("/", categoryController.createCategory);

categoriesRoutes.put("/:id", categoryController.updateCategory);

categoriesRoutes.delete("/:id", categoryController.deleteCategory);
