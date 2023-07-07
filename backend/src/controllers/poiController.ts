import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Poi } from "../entities/Poi";
import { Not } from "typeorm";

export default class PoiController {
  // get all POIs
  async getPoi(req: Request, res: Response): Promise<void> {
    try {
      const allPoi = await dataSource.getRepository(Poi).find({
        relations: {
          category: true,
          city: true,
          user: true,
        },
      });
      res.status(200).send(allPoi);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading points of interest");
    }
  }

  // get one POI by id (params)
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

  // create POI
  async createPoi(req: Request, res: Response): Promise<void> {
    try {
      const { coordinates } = req.body;
      // check if coords doesn't already exist in db
      const coordsAlreadyExist = await dataSource.getRepository(Poi).count({
        where: {
          coordinates: {
            type: "Point",
            coordinates: [coordinates[0], coordinates[1]],
          },
        },
      });
      if (coordsAlreadyExist > 0) {
        res.status(409).send("Point of interest already exists");
      } else {
        req.body.coordinates = {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]],
        };
        await dataSource.getRepository(Poi).save(req.body);
        res.status(201).send("Created point of interest");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  // update POI by id (params)
  async updatePoi(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { coordinates } = req.body;
      // check if POI exists in db
      const poiToUpdate = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToUpdate === null) {
        res.status(404).send("Point of interest not found");
      } else {
        let coordsAlreadyExist = null;

        // check if body.coords already exists in db
        if (coordinates !== undefined) {
          coordsAlreadyExist = await dataSource.getRepository(Poi).count({
            where: {
              coordinates: {
                type: "Point",
                coordinates: [coordinates[0], coordinates[1]],
              },
              id: Not(id),
            },
          });
        }
        if (coordsAlreadyExist !== null && coordsAlreadyExist > 0) {
          res.status(404).send("Point of interest already exist");
        } else {
          if (coordinates !== undefined) {
            req.body.coordinates = {
              type: "Point",
              coordinates: [coordinates[0], coordinates[1]],
            };
          }
          await dataSource.getRepository(Poi).update(id, req.body);
          res.status(200).send("Updated point of interest");
        }
      }
    } catch (err) {
      res.status(400).send("Error while updating point of interest");
    }
  }

  // delete POI by id (params)
  async deletePoi(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // check if POI exists in db
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
