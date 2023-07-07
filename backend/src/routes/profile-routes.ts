import express from "express";
import { auth } from "../middlewares/auth";
import ProfileController from "../controllers/profileController";

export const profileRoutes = express.Router();

const profileController = new ProfileController();

profileRoutes.get("/", auth, profileController.getProfile);

profileRoutes.get("/:id", profileController.getOneProfile);

// add POI to favorites
profileRoutes.post(
  "/fav/poi/:idUser/:idPoi",
  auth,
  profileController.addFavoritePoiToUser
);

profileRoutes.post(
  "/fav/city/:idUser/:idCity",
  auth,
  profileController.addFavoriteCityToUser
);

profileRoutes.put("/:id", auth, profileController.updateProfile);

profileRoutes.delete("/:id", auth, profileController.deleteProfile);

// delete POI from favorites
profileRoutes.delete(
  "/fav/poi/:idUser/:idPoi",
  auth,
  profileController.removeFavoritePoiToUser
);

// delete city from favorites
profileRoutes.delete(
  "/fav/city/:idUser/:idCity",
  profileController.removeFavoriteCityToUser
);
