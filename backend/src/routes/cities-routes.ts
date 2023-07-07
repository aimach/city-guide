import express from "express";
import { auth } from "../middlewares/auth";
import CityController from "../controllers/cityController";

export const citiesRoutes = express.Router();

const cityController = new CityController();

citiesRoutes.get("/", cityController.getCities);

citiesRoutes.get("/:id", cityController.getOneCity);

citiesRoutes.post("/", auth, cityController.createCity);

citiesRoutes.put("/:id", auth, cityController.updateCity);

citiesRoutes.delete("/:id", auth, cityController.deleteCity);
