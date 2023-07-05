import express from "express";
import ProfileController from "../controllers/profileController";

export const profileRoutes = express.Router();

const profileController = new ProfileController();

profileRoutes.get("/", profileController.getProfile);

profileRoutes.get("/:id", profileController.getOneProfile);

profileRoutes.put("/:id", profileController.updateProfile);

profileRoutes.delete("/:id", profileController.deleteProfile);
