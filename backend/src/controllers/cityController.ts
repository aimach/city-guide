import { Request, Response } from "express";
import dataSource from "../dataSource";
import { City } from "../entities/City";

export default class CityController {
  // citiesController.getCities
  async getCities(req: Request, res: Response): Promise<void> {
    try {
      const allCities = await dataSource.getRepository(City).find({
        relations: {
          userAdminCity: true,
          poi: true,
        },
      });
      res.status(200).send(allCities);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading cities");
    }
  }

  // categoriesController.getOneCity
  async getOneCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cityToRead = await dataSource.getRepository(City).findOne({
        where: { id },
        relations: {
          userAdminCity: true,
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

  // citiesController.createCity
  // je n'arrive pas à vérifier quand l'administrateur de ville existe déjà
  async createCity(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    try {
      const createCity = await dataSource
        .getRepository(City)
        .count({ where: { name } });
      if (createCity > 0) {
        res.status(409).send("City already exists");
      } else {
        await dataSource.getRepository(City).save(req.body);
        res.status(201).send("Created city");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }

  // citiesController.updateCity
  // je n'arrive pas à vérifier quand l'administrateur de ville existe déjà
  async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cityToUpdate = await dataSource
        .getRepository(City)
        .findOneBy({ id });
      if (cityToUpdate === null) {
        res.status(404).send("City not found");
      } else {
        await dataSource.getRepository(City).update(id, req.body);
        res.status(200).send("Updated city");
      }
    } catch (err) {
      res.status(400).send("Error while updating city");
    }
  }

  // citiesController.deleteCity
  async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
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
