import { Request, Response } from "express";
import dataSource from "../dataSource";
import { City } from "../entities/City";
import { Not } from "typeorm";
import { IController } from "./user-controller";
import fs from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const CityController: IController = {
  // GET ALL CITIES

  getCities: async (req: Request, res: Response): Promise<void> => {
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
  },

  // GET ONE CITY BY ID

  getOneCity: async (req: Request, res: Response): Promise<void> => {
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
  },

  // CREATE CITY

  createCity: async (req: Request, res: Response): Promise<void> => {
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
        return;
      }

      // rename file image
      if (req.file) {
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/city/${filename}`,
          `./public/city/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/city/${newName}`;
      }

      // format coordinates
      req.body.coordinates = {
        type: "Point",
        coordinates: [coordinates[0], coordinates[1]],
      };

      await dataSource.getRepository(City).save(req.body);
      res.status(201).send("Created city");
    } catch (error: any) {
      // check if error is 'Key ("userAdminCityId")=(id) already exists'
      if (error.code === "23505") {
        res.status(409).send("User is already administrator in another city");
      } else {
        res.status(400).send("Something went wrong");
      }
    }
  },

  // UPDATE CITY BY ID

  updateCity: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, coordinates } = req.body;

      // check if city exists by id
      const cityToUpdate = await dataSource
        .getRepository(City)
        .findOneBy({ id });

      if (cityToUpdate === null) {
        res.status(404).send("City not found");
        return;
      }

      // check if body.name already exists in db
      let nameAlreadyExist = null;
      let coordsAlreadyExist = null;
      if (name !== undefined) {
        nameAlreadyExist = await dataSource
          .getRepository(City)
          // check every tuples except the one updating
          .count({ where: { name, id: Not(id) } });
        if (nameAlreadyExist > 0) {
          res.status(409).send("City already exists");
          return;
        }
      }

      // check if body.coordinates already exists in db
      if (coordinates !== undefined) {
        coordsAlreadyExist = await dataSource.getRepository(City).count({
          where: {
            coordinates: {
              type: "Point",
              coordinates: [coordinates[0], coordinates[1]],
            },
            id: Not(id),
          },
        });
        if (coordsAlreadyExist > 0) {
          res.status(409).send("City already exists");
          return;
        }
        // format coordinates
        req.body.coordinates = {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]],
        };
      }

      // if file, rename the new file and delete the old one
      if (req.file) {
        // rename the new file
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/city/${filename}`,
          `./public/city/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/city/${newName}`;

        // delete the older file
        if (cityToUpdate.image !== null) {
          await unlink("." + cityToUpdate.image);
        }
      }

      await dataSource.getRepository(City).update(id, req.body);
      res.status(200).send("Updated city");
    } catch (error: any) {
      // check if error is 'Key ("userAdminCityId")=(id) already exists'
      if (error.code === "23505") {
        res.status(409).send("User is already administrator in another city");
      } else {
        res.status(400).send("Something went wrong");
      }
    }
  },

  // DELETE CITY

  deleteCity: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // check if city exists in db
      const cityToDelete = await dataSource
        .getRepository(City)
        .findOneBy({ id });
      if (cityToDelete === null) {
        res.status(404).send("City not found");
        return;
      }

      await dataSource.getRepository(City).delete(id);
      // delete image in public directory
      if (cityToDelete.image !== null) {
        await unlink("." + cityToDelete.image);

        res.status(200).send("Deleted city");
      }
    } catch (err) {
      res.status(400).send("Error while deleting city");
    }
  },
};
