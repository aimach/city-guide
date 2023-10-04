import express from "express";
import multer from "multer";

import { auth } from "../middlewares/auth";
import { ProfileController } from "../controllers/profileController";

const upload = multer({ dest: "./public/user" });

export const profileRoutes = express.Router();

profileRoutes.get("/", auth, ProfileController.getProfile);

profileRoutes.get(
  "/my-profile",
  auth,
  ProfileController.getAuthenticatedUserProfile
);

profileRoutes.get("/:id", auth, ProfileController.getOneProfile);

// add POI to favorites
profileRoutes.post(
  "/fav/poi/:idUser/:idPoi",
  auth,
  ProfileController.addFavoritePoiToUser
);

// add city to favorites
profileRoutes.post(
  "/fav/city/:idUser/:idCity",
  auth,
  ProfileController.addFavoriteCityToUser
);

profileRoutes.put(
  "/:id",
  auth,
  upload.single("image"),
  ProfileController.updateProfile
);

profileRoutes.delete("/:id", auth, ProfileController.deleteProfile);

// delete POI from favorites
profileRoutes.delete(
  "/fav/poi/:idUser/:idPoi",
  auth,
  ProfileController.removeFavoritePoiToUser
);

// delete city from favorites
profileRoutes.delete(
  "/fav/city/:idUser/:idCity",
  auth,
  ProfileController.removeFavoriteCityToUser
);
