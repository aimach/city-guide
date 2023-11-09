import { Request, Response } from "express";
import dataSource from "../dataSource";
import { User, UserRole } from "../entities/User";
import { Poi } from "../entities/Poi";
import { City } from "../entities/City";
import { IController } from "./user-controller";
import fs from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import jwt from "jsonwebtoken";

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
          "user.bio",
          "user.image",
          "user.role",
          "user.city",
          "user.email",
        ])
        .leftJoinAndSelect("user.createdPoi", "createdPoi")
        .leftJoinAndSelect("user.favouriteCities", "favouritesCities")
        .leftJoinAndSelect("user.favouritePoi", "favouritePoi")
        .getMany();

      res.status(200).send(allProfiles);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading users" });
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
          "user.bio",
          "user.image",
          "user.role",
          "user.city",
          "user.email",
        ])
        .leftJoinAndSelect("user.createdPoi", "createdPoi")
        .leftJoinAndSelect("user.favouriteCities", "favouriteCities")
        .leftJoinAndSelect("user.favouritePoi", "favouritePoi")
        .where("user.id = :id", { id })
        .getOne();

      if (profileToRead === null) {
        res.status(404).send({ error: "User not found" });

        return;
      } else {
        res.status(200).send(profileToRead);
      }
    } catch (err) {
      res.status(400).send({ error: "Error while reading user" });
    }
  },

  getAuthenticatedUserProfile: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(
        token,
        process.env.TOKEN as string
      ) as jwt.JwtPayload;
      const id = decodedToken.userId as string;
      const myProfile = await dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .select([
          "user.id",
          "user.username",
          "user.bio",
          "user.image",
          "user.role",
          "user.city",
          "user.email",
        ])
        .leftJoinAndSelect("user.createdPoi", "createdPoi")
        .leftJoinAndSelect("user.favouriteCities", "favouriteCities")
        .leftJoinAndSelect("user.favouritePoi", "favouritePoi")
        .where("user.id = :id", { id })
        .getOne();
      if (myProfile === null) {
        return res.status(404).send({ error: "User not found" });
      } else {
        return res.status(200).send(myProfile);
      }
    } catch (err) {
      return res.status(400).send({ error: "Error while reading user" });
    }
  },

  // UPDATE PROFILE BY ID

  updateProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, userId } = req.params;
      const { username, email, bio, city, role } = req.body as User;

      // check if input with string are alpha and not empty
      const checkIfStringAndNotEmpty = async (value: string): Promise<void> => {
        if (
          validator.isEmpty(value, { ignore_whitespace: true }) ||
          typeof value !== "string"
        ) {
          res.status(400).send({
            error: `Field must contains only characters`,
          });
          if (req.file !== undefined)
            await unlink(`./public/user/${req.file?.filename}`);
          return;
        }
      };

      const inputString: string[] = [username, email, bio, city];
      inputString.forEach(async (value) => {
        if (value !== null) await checkIfStringAndNotEmpty(value);
      });

      // check enum in role
      const roles: UserRole[] = Object.values(UserRole);
      if (role !== null && !roles.includes(role)) {
        res.status(400).send({ error: "User role does not exist" });
        if (req.file !== undefined)
          await unlink(`./public/user/${req.file?.filename}`);
        return;
      }

      // check if profile exists in db
      const profileToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToUpdate === null) {
        res.status(404).send({ error: "User not found" });
        if (req.file !== undefined)
          await unlink(`./public/user/${req.file?.filename}`);
        return;
      }

      // Only admin user can update a role
      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (role !== null && currentUser?.role !== UserRole.ADMIN) {
        req.body.role = currentUser?.role;
      }

      // Check if connected user has the same id than profile to update or if he is admin
      if (
        currentUser?.id !== profileToUpdate.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to update this profile",
        });
        if (req.file !== undefined)
          await unlink(`./public/user/${req.file?.filename}`);
        return;
      }

      // check if username already exist in db
      if (username !== null) {
        const usernameAlreadyExist = await dataSource
          .getRepository(User)
          .findOne({ where: { username } });
        if (usernameAlreadyExist !== null) {
          if (usernameAlreadyExist.username !== currentUser.username) {
            res.status(409).send({ error: "Username already exists" });
            if (req.file !== undefined)
              await unlink(`./public/user/${req.file?.filename}`);
          }
        }

        if (
          !validator.matches(
            username,
            /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{3,20}$/
          )
        ) {
          res.status(401).send({
            error: "Username must contain 3 to 20 characters and no symbol",
          });
          if (req.file !== undefined)
            await unlink(`./public/user/${req.file?.filename}`);
        }
      }

      // check if email already exist in db
      if (email !== null) {
        const emailAlreadyExist = await dataSource
          .getRepository(User)
          .findOne({ where: { email } });
        if (emailAlreadyExist !== null) {
          if (emailAlreadyExist.email !== currentUser.email) {
            res.status(409).send({ error: "Email already exists" });
            if (req.file !== undefined)
              await unlink(`./public/user/${req.file?.filename}`);
          }
        }
        if (!validator.isEmail(email)) {
          res.status(401).send({ error: "Incorrect email format" });
          if (req.file !== undefined)
            await unlink(`./public/user/${req.file?.filename}`);
        }
      }

      // rename the new file and delete the older one
      if (req.file !== undefined) {
        // rename
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/user/${filename}`,
          `./public/user/${newName}`,
          (err) => {
            if (err !== null) throw err;
          }
        );
        req.body.image = `./public/user/${newName}`;

        // delete
        if (profileToUpdate.image !== "") {
          await unlink(profileToUpdate.image);
        }
      }

      await dataSource.getRepository(User).update(id, req.body);
      res.status(200).send("Updated user");
    } catch (err) {
      if (req.file !== undefined)
        try {
          await unlink(req.body.image);
        } catch (error) {
          res.status(400).send({ error: "Cannot delete avatar" });
          return;
        }
      console.log(err);
      res.status(400).send({ error: "Error while updating user" });
    }
  },

  // DELETE PROFILE BY ID

  deleteProfile: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id, userId } = req.params;

      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      // check if profile exists in db
      const profileToDelete = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToDelete === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      if (
        currentUser?.id !== profileToDelete.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to delete this profile",
        });

        return;
      }
      await dataSource.getRepository(User).delete(id);

      // delete image in public directory
      if (profileToDelete.image !== null) {
        await unlink("." + profileToDelete.image);
      }

      res.status(200).send("Deleted user");
    } catch (err) {
      res.status(400).send({ error: "Error while deleting user" });
    }
  },

  // ADD POI TO FAVORITE ARRAY

  addFavoritePoiToUser: async (req: Request, res: Response): Promise<void> => {
    const { idUser, idPoi, userId } = req.params;
    try {
      // check if profile exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      // Check if user connected is the user to update or is an admin
      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (
        currentUser?.id !== userToUpdate.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to update this profile",
        });
        return;
      }

      // check if POI exists in db
      const poiToAdd = await dataSource
        .getRepository(Poi)
        .findOneBy({ id: idPoi });
      if (poiToAdd === null) {
        res.status(404).send({ error: "Point of interest not found" });
        return;
      }

      // add POI to favourites array
      userToUpdate.favouritePoi = [...userToUpdate.favouritePoi, poiToAdd];
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).send("Favorite poi added to user");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Error while adding point of interest to favorites",
      });
    }
  },

  // REMOVE POI FROM FAVORITE ARRAY

  removeFavoritePoiToUser: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idUser, idPoi, userId } = req.params;
    try {
      // check if profile exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      // Check if user connected is the user to update or is an admin
      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (
        currentUser?.id !== userToUpdate.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to update this profile",
        });
        return;
      }

      // check if POI exists in db
      const poiToRemove = await dataSource
        .getRepository(Poi)
        .findOneBy({ id: idPoi });
      if (poiToRemove === null) {
        res.status(404).send({ error: "Point of interest not found" });
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
      res.status(400).send({
        error: "Error while removing point of interest to favorites",
      });
    }
  },

  // ADD CITY TO FAVORITE ARRAY

  addFavoriteCityToUser: async (req: Request, res: Response): Promise<void> => {
    const { idUser, idCity, userId } = req.params;
    try {
      // check if user exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      // check if city exists in db
      const cityToAdd = await dataSource
        .getRepository(City)
        .findOneBy({ id: idCity });
      if (cityToAdd === null) {
        res.status(404).send({ error: "City not found" });
        return;
      }

      // Check if user connected is the user to update or is an admin
      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (
        currentUser?.id !== userToUpdate.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to update this profile",
        });
        return;
      }

      // add city to favourite array
      userToUpdate.favouriteCities = [
        ...userToUpdate.favouriteCities,
        cityToAdd,
      ];
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).json("Favorite city added to user");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Error while adding city to favorites",
      });
    }
  },

  // REMOVE CITY FROM FAVORITE ARRAY

  removeFavoriteCityToUser: async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { idUser, idCity, userId } = req.params;
    try {
      // check if user exists in db
      const userToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id: idUser });
      if (userToUpdate === null) {
        res.status(404).send({ error: "User not found" });
        return;
      }

      // check if city exists in db
      const cityToRemove = await dataSource
        .getRepository(City)
        .findOneBy({ id: idCity });
      if (cityToRemove === null) {
        res.status(404).send({ error: "City not found" });
        return;
      }

      // Check if user connected is the user to update or is an admin
      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (
        currentUser?.id !== userToUpdate.id &&
        currentUser?.role !== UserRole.ADMIN
      ) {
        res.status(403).send({
          error: "You are not authorized to update this profile",
        });
        return;
      }

      // filter favourites array to remove city
      userToUpdate.favouriteCities = userToUpdate.favouriteCities.filter(
        (poi) => poi.id !== idCity
      );
      await dataSource.getRepository(User).save(userToUpdate);
      res.status(200).json("Favorite city remove to user");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: "Error while removing city to favorites",
      });
    }
  },
};
