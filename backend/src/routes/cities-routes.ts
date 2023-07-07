import express from "express";
import multer from "multer";

import { auth } from "../middlewares/auth";
import { CityController } from "../controllers/cityController";

export const citiesRoutes = express.Router();

citiesRoutes.get("/", CityController.getCities);

citiesRoutes.get("/:id", CityController.getOneCity);

citiesRoutes.post("/", auth, CityController.createCity);

citiesRoutes.put("/:id", auth, CityController.updateCity);

citiesRoutes.delete("/:id", auth, CityController.deleteCity);
