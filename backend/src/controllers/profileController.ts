import { Request, Response } from "express";
import dataSource from "../dataSource";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";

export default class ProfileController {
  // get all profiles
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const allProfiles = await dataSource.getRepository(User).find({
        relations: {
          createdPoi: true,
        },
      });
      res.status(200).send(allProfiles);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading users");
    }
  }

  // get one profile by id (params)
  async getOneProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const profileToRead = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToRead === null) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(profileToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading user");
    }
  }

  // update profile by id (params)
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const profileToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        await dataSource.getRepository(User).update(id, req.body);
        res.status(200).send("Updated user");
      }
    } catch (err) {
      res.status(400).send("Error while updating user");
    }
  }

  // delete profile by id (params)
  async deleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const profileToDelete = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToDelete === null) {
        res.status(404).send("User not found");
      } else {
        await dataSource.getRepository(User).delete(id);
        res.status(200).send("Deleted user");
      }
    } catch (err) {
      res.status(400).send("Error while deleting user");
    }
  }

  // add poi to favorite array
  async addFavoritePoiToUser(req: Request, res: Response): Promise<void> {
    const { idUser, idPoi } = req.params;
    try {
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      console.log(userToUpdate);
      if (userToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        const poiToAdd = await dataSource
          .getRepository(Poi)
          .findOneBy({ id: idPoi });
        if (poiToAdd === null) {
          res.status(404).send("Point of interest not found");
        } else {
          userToUpdate.favouritePoi = [...userToUpdate.favouritePoi, poiToAdd];
          await dataSource.getRepository(User).save(userToUpdate);
          res.status(200).send("Favorite poi added to user");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while adding point of interest to favorites");
    }
  }

  // remove POI to favorite array
  async removeFavoritePoiToUser(req: Request, res: Response): Promise<void> {
    const { idUser, idPoi } = req.params;
    try {
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      console.log(userToUpdate);
      if (userToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        const poiToRemove = await dataSource
          .getRepository(Poi)
          .findOneBy({ id: idPoi });
        if (poiToRemove === null) {
          res.status(404).send("Point of interest not found");
        } else {
          userToUpdate.favouritePoi = userToUpdate.favouritePoi.filter(
            (poi) => poi.id !== idPoi
          );
          await dataSource.getRepository(User).save(userToUpdate);
          res.status(200).send("Favorite poi remove to user");
        }
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send("Error while removing point of interest to favorites");
    }
  }

  // add city to favorite array
  async addFavoriteCityToUser(req: Request, res: Response): Promise<void> {
    const { idUser, idCity } = req.params;
    try {
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      console.log(userToUpdate);
      if (userToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        const cityToAdd = await dataSource
          .getRepository(City)
          .findOneBy({ id: idCity });
        if (cityToAdd === null) {
          res.status(404).send("City not found");
        } else {
          userToUpdate.favouriteCities = [
            ...userToUpdate.favouriteCities,
            cityToAdd,
          ];
          await dataSource.getRepository(User).save(userToUpdate);
          res.status(200).send("Favorite city added to user");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while adding city to favorites");
    }
  }

  // remove city to farovite array
  async removeFavoriteCityToUser(req: Request, res: Response): Promise<void> {
    const { idUser, idCity } = req.params;
    try {
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      console.log(userToUpdate);
      if (userToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        const cityToRemove = await dataSource
          .getRepository(City)
          .findOneBy({ id: idCity });
        if (cityToRemove === null) {
          res.status(404).send("City not found");
        } else {
          userToUpdate.favouriteCities = userToUpdate.favouriteCities.filter(
            (poi) => poi.id !== idCity
          );
          await dataSource.getRepository(User).save(userToUpdate);
          res.status(200).send("Favorite city remove to user");
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while removing city to favorites");
    }
  }
}
