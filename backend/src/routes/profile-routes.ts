import express from "express";
import ProfileController from "../controllers/profileController";

export const profileRoutes = express.Router();

const profileController = new ProfileController();

profileRoutes.get("/", profileController.getProfile);

profileRoutes.get("/:id", profileController.getOneProfile);

profileRoutes.post(
  "/fav/poi/:idUser/:idPoi",
  profileController.addFavoritePoiToUser
);

profileRoutes.post(
  "/fav/city/:idUser/:idCity",
  profileController.addFavoriteCityToUser
);

profileRoutes.put("/:id", profileController.updateProfile);

profileRoutes.delete("/:id", profileController.deleteProfile);

profileRoutes.delete(
  "/fav/poi/:idUser/:idPoi",
  profileController.removeFavoritePoiToUser
);

profileRoutes.delete(
  "/fav/city/:idUser/:idCity",
  profileController.removeFavoriteCityToUser
);
