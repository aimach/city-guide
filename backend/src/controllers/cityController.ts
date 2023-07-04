import dataSource from "../dataSource";
import { City } from "../models/City";

export default class CategoryController {
  // citiesController.getCities
  async getCities(req, res) {
    try {
      const allCities = await dataSource.getRepository(City).find();
      res.status(200).send(allCities);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading cities");
    }
  }

  // categoriesController.getOneCity
  // la route n'existe pas mais j'ai créé le controller au cas où

  async getOneCity(req, res) {
    try {
      const id = req.params;
      const cityToRead = await dataSource.getRepository(City).findOneBy({ id });
      if (cityToRead === null) {
        res.status(404).send("City not found");
      } else {
        res.stats(200).send(cityToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading city");
    }
  }

  // citiesController.createCity
  async createCity(req, res) {
    try {
      const createCity = await dataSource.getRepository(City).save(req.body);
      // vérifier que ça a bien été créé dans la bdd
      res.status(201).send("Created city");
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        res.status(409).send("City already exists");
      }
      res.status(400).send("Something went wrong");
    }
  }

  // citiesController.updateCity
  async updateCity(req, res) {
    try {
      const id = req.params;
      const cityToUpdate = await dataSource
        .getRepository(City)
        .findOneBy({ id });
      if (cityToUpdate === null) {
        res.status(404).send("City not found");
      } else {
        await dataSource.getRepository(City).update(id, {
          // à modifier en fonction du contenu
        });
        res.status(200).send("Updated city");
      }
    } catch (err) {
      res.status(400).send("Error while updating city");
    }
  }

  // citiesController.deleteCity
  async deleteProfile(req, res) {
    try {
      const id = req.params;
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
