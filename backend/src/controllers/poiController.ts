import dataSource from "../dataSource";
import { Poi } from "../entities/Poi";

export default class PoiController {
  // poiController.getPoi
  async getPoi(req, res) {
    try {
      const allPoi = await dataSource.getRepository(Poi).find();
      res.status(200).send(allPoi);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading points of interest");
    }
  }

  // poiController.getOnePoi
  // la route n'existe pas mais j'ai créé le controller au cas où

  async getOnePoi(req, res) {
    try {
      const id = req.params;
      const poiToRead = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToRead === null) {
        res.status(404).send("Point of interest not found");
      } else {
        res.stats(200).send(poiToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading point of interest");
    }
  }

  // poiController.createPoi
  async createPoi(req, res) {
    try {
      const createPoi = await dataSource.getRepository(Poi).save(req.body);
      // vérifier que ça a bien été créé dans la bdd
      res.status(201).send("Created point of interest");
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Point of interest already exists");
      }
      res.status(400).send("Something went wrong");
    }
  }

  // poiController.updatePoi
  async updatePoi(req, res) {
    try {
      const id = req.params;
      const poiToUpdate = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToUpdate === null) {
        res.status(404).send("Point of interest not found");
      } else {
        await dataSource.getRepository(Poi).update(id, {
          // à modifier en fonction du contenu
        });
        res.status(200).send("Updated point of interest");
      }
    } catch (err) {
      res.status(400).send("Error while updating point of interest");
    }
  }

  // poiController.deletePoi
  async deletePoi(req, res) {
    try {
      const id = req.params;
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
