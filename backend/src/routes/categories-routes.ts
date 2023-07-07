import express from "express";
import { auth } from "../middlewares/auth";
import { CategoryController } from "../controllers/categoryController";

export const categoriesRoutes = express.Router();

categoriesRoutes.get("/", CategoryController.getCategories);

categoriesRoutes.get("/:id", CategoryController.getOneCategory);

categoriesRoutes.post("/", auth, CategoryController.createCategory);

categoriesRoutes.put("/:id", auth, CategoryController.updateCategory);

categoriesRoutes.delete("/:id", auth, CategoryController.deleteCategory);
