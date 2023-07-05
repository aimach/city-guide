import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Poi } from "../entities/Poi";

export default class PoiController {
  // poiController.getPoi
  async getPoi(req: Request, res: Response): Promise<void> {
    try {
      const allPoi = await dataSource.getRepository(Poi).find();
      res.status(200).send(allPoi);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading points of interest");
    }
  }

  // poiController.getOnePoi
  async getOnePoi(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const poiToRead = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToRead === null) {
        res.status(404).send("Point of interest not found");
      } else {
        res.status(200).send(poiToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading point of interest");
    }
  }

  // poiController.createPoi
  async createPoi(req: Request, res: Response): Promise<void> {
    try {
      const createPoi = await dataSource
        .getRepository(Poi)
        .count({ where: { name: req.body.name } });
      if (createPoi > 0) {
        res.status(409).send("Point of interest already exists");
      } else {
        await dataSource.getRepository(Poi).save(req.body);
        res.status(201).send("Created point of interest");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  // poiController.updatePoi
  async updatePoi(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const poiToUpdate = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToUpdate === null) {
        res.status(404).send("Point of interest not found");
      } else {
        await dataSource.getRepository(Poi).update(id, req.body);
        res.status(200).send("Updated point of interest");
      }
    } catch (err) {
      res.status(400).send("Error while updating point of interest");
    }
  }

  // poiController.deletePoi
  async deletePoi(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const poiToDelete = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToDelete === null) {
        res.status(404).send("Point of interest not found");
      } else {
        await dataSource.getRepository(Poi).delete(id);
        res.status(200).send("Deleted point of interest");
      }
    } catch (err) {
      res.status(400).send("Error while deleting point of interest");
    }
  }
}
