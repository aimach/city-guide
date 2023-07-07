import { PoiController } from "../controllers/poiController";
import express from "express";
import { auth } from "../middlewares/auth";
export const poiRoutes = express.Router();

poiRoutes.get("/", PoiController.getPoi);

poiRoutes.get("/:id", PoiController.getOnePoi);

poiRoutes.post("/", auth, PoiController.createPoi);

poiRoutes.put("/:id", auth, PoiController.updatePoi);

poiRoutes.delete("/:id", auth, PoiController.deletePoi);
