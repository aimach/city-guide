import express from "express";
import { auth } from "../middlewares/auth";
import { ProfileController } from "../controllers/profileController";

export const profileRoutes = express.Router();

profileRoutes.get("/", auth, ProfileController.getProfile);

profileRoutes.get("/:id", ProfileController.getOneProfile);

// add POI to favorites
profileRoutes.post(
  "/fav/poi/:idUser/:idPoi",
  auth,
  ProfileController.addFavoritePoiToUser
);

profileRoutes.post(
  "/fav/city/:idUser/:idCity",
  auth,
  ProfileController.addFavoriteCityToUser
);

profileRoutes.put("/:id", auth, ProfileController.updateProfile);

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
  ProfileController.removeFavoriteCityToUser
);
