import express from "express";
import PoiController from "../controllers/poiController";

export const poiRoutes = express.Router();

const poiController = new PoiController();

poiRoutes.get("/", poiController.getPoi);

poiRoutes.get("/:id", poiController.getOnePoi);

poiRoutes.post("/", poiController.createPoi);

poiRoutes.put("/:id", poiController.updatePoi);

poiRoutes.delete("/:id", poiController.deletePoi);
