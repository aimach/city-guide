import express from "express";
import multer from "multer";
import { auth } from "../middlewares/auth";
import { CategoryController } from "../controllers/categoryController";

export const categoriesRoutes = express.Router();

const upload = multer({ dest: "./public/categories" });

categoriesRoutes.get("/", CategoryController.getCategories);

categoriesRoutes.get("/:id", CategoryController.getOneCategory);

categoriesRoutes.post(
  "/",
  // auth,
  upload.single("image"),
  CategoryController.createCategory
);

categoriesRoutes.put("/:id", auth, CategoryController.updateCategory);

categoriesRoutes.delete("/:id", auth, CategoryController.deleteCategory);
