import PoiController from "../controllers/poiController";
import express from "express";
import { auth } from "../middlewares/auth";
export const poiRoutes = express.Router();

const poiController = new PoiController();

poiRoutes.get("/", poiController.getPoi);

poiRoutes.get("/:id", poiController.getOnePoi);

poiRoutes.post("/", auth, poiController.createPoi);

poiRoutes.put("/:id", auth, poiController.updatePoi);

poiRoutes.delete("/:id", auth, poiController.deletePoi);
