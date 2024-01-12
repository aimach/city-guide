import express from "express";
import multer from "multer";
import { auth } from "../middlewares/auth";
import { CityController } from "../controllers/cityController";

const upload = multer({ dest: "./public/city" });

export const citiesRoutes = express.Router();

citiesRoutes.get("/", CityController.getCities);

citiesRoutes.get("/:id", CityController.getOneCity);

citiesRoutes.post("/", auth, upload.single("image"), CityController.createCity);

citiesRoutes.put(
	"/:id",
	auth,
	upload.single("image"),
	CityController.updateCity
);

citiesRoutes.delete("/:id", auth, CityController.deleteCity);
