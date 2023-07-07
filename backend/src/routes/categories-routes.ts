import express from "express";
import { auth } from "../middlewares/auth";
import CategoryController from "../controllers/categoryController";

export const categoriesRoutes = express.Router();

const categoryController = new CategoryController();

categoriesRoutes.get("/", categoryController.getCategories);

categoriesRoutes.get("/:id", categoryController.getOneCategory);

categoriesRoutes.post("/", auth, categoryController.createCategory);

categoriesRoutes.put("/:id", auth, categoryController.updateCategory);

categoriesRoutes.delete("/:id", auth, categoryController.deleteCategory);
