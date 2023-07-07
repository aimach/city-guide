import { Request, Response } from "express";
import dataSource from "../dataSource";
import { City } from "../entities/City";
import { Not } from "typeorm";

export default class CityController {
  // get all cities
  async getCities(req: Request, res: Response): Promise<void> {
    try {
      const allCities = await dataSource.getRepository(City).find({
        relations: {
          user_admin_city: true,
          poi: true,
        },
      });
      res.status(200).send(allCities);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading cities");
    }
  }

  // get one city byd id (params)
  async getOneCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cityToRead = await dataSource.getRepository(City).findOne({
        where: { id },
        relations: {
          user_admin_city: true,
          poi: true,
        },
      });
      if (cityToRead === null) {
        res.status(404).send("City not found");
      } else {
        res.status(200).send(cityToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading city");
    }
  }

  // create city
  async createCity(req: Request, res: Response): Promise<void> {
    const { name, coordinates } = req.body;
    try {
      // check if name doesn't already exist in db
      const nameAlreadyExist = await dataSource
        .getRepository(City)
        .count({ where: { name } });
      // check if coords doesn't already exist in db
      const coordsAlreadyExist = await dataSource.getRepository(City).count({
        where: {
          coordinates: {
            type: "Point",
            coordinates: [coordinates[0], coordinates[1]],
          },
        },
      });
      // if one or another exists, send 409
      if (nameAlreadyExist > 0 || coordsAlreadyExist > 0) {
        res.status(409).send("City already exists");
      } else {
        req.body.coordinates = {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]],
        };
        await dataSource.getRepository(City).save(req.body);
        res.status(201).send("Created city");
      }
    } catch (error: any) {
      // check if error is 'Key ("userAdminCityId")=(id) already exists'
      if (error.code === "23505") {
        res.status(409).send("User is already administrator in another city");
      } else {
        res.status(400).send("Something went wrong");
      }
    }
  }

  // update city by id (params)
  async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, coordinates } = req.body;
      // check if city exists by id
      const cityToUpdate = await dataSource
        .getRepository(City)
        .findOneBy({ id });
      // if city doesn't exist, send 404
      if (cityToUpdate === null) {
        res.status(404).send("City not found");
      } else {
        let nameAlreadyExist = null;
        let coordsAlreadyExist = null;
        if (name !== undefined) {
          // check if body.name doesn't already exist in db
          nameAlreadyExist = await dataSource
            .getRepository(City)
            // check every tuples except the one updating
            .count({ where: { name, id: Not(id) } });
        }
        if (coordinates !== undefined) {
          // check if body.coords doesn't already exist in db
          coordsAlreadyExist = await dataSource.getRepository(City).count({
            where: {
              coordinates: {
                type: "Point",
                coordinates: [coordinates[0], coordinates[1]],
              },
              id: Not(id),
            },
          });
        }
        // if one or another exists, send 409
        if (
          nameAlreadyExist !== null &&
          nameAlreadyExist > 0 &&
          coordsAlreadyExist !== null &&
          coordsAlreadyExist > 0
        ) {
          res.status(409).send("City already exists");
        } else {
          if (coordinates !== undefined) {
            req.body.coordinates = {
              type: "Point",
              coordinates: [coordinates[0], coordinates[1]],
            };
          }
          await dataSource.getRepository(City).update(id, req.body);
          res.status(200).send("Updated city");
        }
      }
    } catch (error: any) {
      // check if error is 'Key ("userAdminCityId")=(id) already exists'
      if (error.code === "23505") {
        res.status(409).send("User is already administrator in another city");
      } else {
        res.status(400).send("Something went wrong");
      }
    }
  }

  // delete city
  async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      // check if city exists in db
      const cityToDelete = await dataSource
        .getRepository(City)
        .findOneBy({ id });
      if (cityToDelete === null) {
        res.status(404).send("City not found");
      } else {
        await dataSource.getRepository(City).delete(id);
        res.status(200).send("Deleted city");
      }
    } catch (err) {
      res.status(400).send("Error while deleting city");
    }
  }
}
