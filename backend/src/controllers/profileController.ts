import { Request, Response } from "express";
import dataSource from "../dataSource";
import { User } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { IController } from "./user-controller";
import fs from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const ProfileController: IController = {
  // GET ALL PROFILES

  getProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const allProfiles = await dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select([
          "user.id",
          "user.username",
          "user.image",
          "user.role",
          "user.city",
          "user.email",
        ])
        .leftJoinAndSelect("user.createdPoi", "createdPoi")
        .getMany();

      res.status(200).send(allProfiles);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading users");
    }
  },

  // GET ONE PROFILE BY ID

  getOneProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // check if profile exists in db
      const profileToRead = await dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select([
          "user.id",
          "user.username",
          "user.image",
          "user.role",
          "user.city",
          "user.email",
        ])
        .leftJoinAndSelect("user.createdPoi", "createdPoi")
        .where("user.id = :id", { id })
        .getOne();

      if (profileToRead === null) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(profileToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading user");
    }
  },

  // UPDATE PROFILE BY ID

  updateProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;

      // check if profile exists in db
      const profileToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToUpdate === null) {
        res.status(404).send("User not found");
        return;
      }

      // check if username already exist in db
      if (username) {
        const usernameAlreadyExist = await dataSource
          .getRepository(User)
          .count({ where: { username } });
        if (usernameAlreadyExist > 0) {
          res.status(409).send("Username already exists");
        }
      }

      // check if email already exist in db
      if (email) {
        const emailAlreadyExist = await dataSource
          .getRepository(User)
          .count({ where: { email } });
        if (emailAlreadyExist > 0) {
          res.status(409).send("Email already exists");
        }
      }

      // rename the new file and delete the older one
      if (req.file) {
        // rename
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/user/${filename}`,
          `./public/user/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/user/${newName}`;

        // delete
        if (profileToUpdate.image !== null) {
          await unlink("." + profileToUpdate.image);
        }
      }

      await dataSource.getRepository(User).update(id, req.body);
      res.status(200).send("Updated user");
    } catch (err) {
      res.status(400).send("Error while updating user");
    }
  },

  // DELETE PROFILE BY ID

  deleteProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // check if profile exists in db
      const profileToDelete = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToDelete === null) {
        res.status(404).send("User not found");
        return;
      }

      await dataSource.getRepository(User).delete(id);

      // delete image in public directory
      if (profileToDelete.image !== null) {
        await unlink("." + profileToDelete.image);
      }

      res.status(200).send("Deleted user");
    } catch (err) {
      res.status(400).send("Error while deleting user");
    }
  },

  // ADD POI TO FAVORITE ARRAY

  addFavoritePoiToUser: async (req: Request, res: Response): Promise<void> => {
    const { idUser, idPoi } = req.params;
    try {
      // check if profile exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send("User not found");
        return;
      }

      // check if POI exists in db
      const poiToAdd = await dataSource
        .getRepository(Poi)
        .findOneBy({ id: idPoi });
      if (poiToAdd === null) {
        res.status(404).send("Point of interest not found");
        return;
      }

      // add POI to favourites array
      userToUpdate.favouritePoi = [...userToUpdate.favouritePoi, poiToAdd];
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).send("Favorite poi added to user");
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while adding point of interest to favorites");
    }
  },

  // REMOVE POI FROM FAVORITE ARRAY

  removeFavoritePoiToUser: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idUser, idPoi } = req.params;
    try {
      // check if profile exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send("User not found");
        return;
      }

      // check if POI exists in db
      const poiToRemove = await dataSource
        .getRepository(Poi)
        .findOneBy({ id: idPoi });
      if (poiToRemove === null) {
        res.status(404).send("Point of interest not found");
        return;
      }

      // filter favourites array to remove POI
      userToUpdate.favouritePoi = userToUpdate.favouritePoi.filter(
        (poi) => poi.id !== idPoi
      );
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).send("Favorite poi remove to user");
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send("Error while removing point of interest to favorites");
    }
  },

  // ADD CITY TO FAVORITE ARRAY

  addFavoriteCityToUser: async (req: Request, res: Response): Promise<void> => {
    const { idUser, idCity } = req.params;
    try {
      // check if user exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send("User not found");
        return;
      }

      // check if city exists in db
      const cityToAdd = await dataSource
        .getRepository(City)
        .findOneBy({ id: idCity });
      if (cityToAdd === null) {
        res.status(404).send("City not found");
        return;
      }

      // add city to favourite array
      userToUpdate.favouriteCities = [
        ...userToUpdate.favouriteCities,
        cityToAdd,
      ];
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).send("Favorite city added to user");
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while adding city to favorites");
    }
  },

  // REMOVE CITY FROM FAVORITE ARRAY

  removeFavoriteCityToUser: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idUser, idCity } = req.params;
    try {
      // check if user exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send("User not found");
        return;
      }

      // check if city exists in db
      const cityToRemove = await dataSource
        .getRepository(City)
        .findOneBy({ id: idCity });
      if (cityToRemove === null) {
        res.status(404).send("City not found");
        return;
      }

      // filter favourites array to remove city
      userToUpdate.favouriteCities = userToUpdate.favouriteCities.filter(
        (poi) => poi.id !== idCity
      );
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).send("Favorite city remove to user");
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while removing city to favorites");
    }
  },
};
