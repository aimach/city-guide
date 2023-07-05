import express from "express";
import CityController from "../controllers/cityController";

export const citiesRoutes = express.Router();

const cityController = new CityController();

citiesRoutes.get("/", cityController.getCities);

citiesRoutes.get("/:id", cityController.getOneCity);

citiesRoutes.post("/", cityController.createCity);

citiesRoutes.put("/:id", cityController.updateCity);

citiesRoutes.delete("/:id", cityController.deleteCity);
