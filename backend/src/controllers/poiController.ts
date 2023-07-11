import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Poi } from "../entities/Poi";
import { Not } from "typeorm";
import { IController } from "./user-controller";
import fs from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

export const PoiController: IController = {
  // GET ALL POI

  getPoi: async (req: Request, res: Response): Promise<void> => {
    try {
      let searchQueries = {};

      // if query in url, add finding options
      if (req.query) {
        const city = req.query.city as string;
        const category = req.query.category as string;
        if (city) {
          searchQueries = { city: { name: city } };
        } else if (category) {
          searchQueries = { category: { name: category } };
        } else if (city && category) {
          searchQueries = {
            category: { name: category },
            city: { name: city },
          };
        }
      }

      // get all poi
      let allPoi = await dataSource.getRepository(Poi).find({
        relations: {
          category: true,
          city: true,
          user: true,
        },
        where: searchQueries,
      });

      res.status(200).send(allPoi);
    } catch (err) {
      res.status(400).send("Error while reading points of interest");
    }
  },

  // GET ONE POI BY ID

  getOnePoi: async (req: Request, res: Response): Promise<void> => {
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
  },

  // CREATE POI

  createPoi: async (req: Request, res: Response): Promise<void> => {
    // VALIDATOR {description: string, address: string, is_accepted: boolean, created_ad: timestamp, updated_at: timestamp,
    // name: string, image: string, categoryId: uuid, cityId: uuid, userId: uuid, coordinates: [x, y] }
    // les 3 clés étrangères peuvent être null mais sinon uuid
    const {
      description,
      address,
      is_accepted,
      name,
      image,
      categoryId,
      cityId,
      userId,
      coordinates,
    } = req.body;

    // check if input with string are alpha and not empty

    const checkIfStringAndNotEmpty = (value: string): void => {
      if (
        validator.isEmpty(value, { ignore_whitespace: true }) ||
        typeof value !== "string"
      ) {
        res.status(400).send({ error: `Field must contains only characters` });
      }
    };

    const inputString: string[] = [description, image, name, address];
    inputString.forEach((value) => checkIfStringAndNotEmpty(value));

    // check name
    if (
      !validator.matches(
        name,
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
      )
    ) {
      res.status(400).send({
        error: `Field must contains only characters (min: 2, max: 100)`,
      });
    }

    // check address
    // ^(([\u00c0-\u01ffa-zA-Z\d])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s)+((\d{5})*\s)([\u00c0-\u01ffa-zA-Z])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s+$
    // ^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$
    if (
      !validator.matches(
        address,
        /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/
      )
    ) {
      res.status(400).send({
        error: `Field must contains only characters (min: 2, max: 100)`,
      });
    }

    // check image

    // check if foreign key are uuid type

    const checkIfUUID = (value: string): void => {
      if (!validator.isUUID(value)) {
        res
          .status(400)
          .send({ error: "Incorrect format of foreign key (must be uuid)" });
      }
    };

    const foreignKeys: string[] = [categoryId, cityId, userId];
    foreignKeys.forEach((value) => {
      if (value) checkIfUUID(value);
    });

    // check if is_accepted is boolean

    if (typeof is_accepted !== "boolean") {
      res.status(400).send("is_accepted must be a boolean");
    }

    try {
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
        return;
      }

      // format coordinates
      req.body.coordinates = {
        type: "Point",
        coordinates: [coordinates[0], coordinates[1]],
      };

      // rename file image
      if (req.file) {
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/poi/${filename}`,
          `./public/poi/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/poi/${newName}`;
      }

      await dataSource.getRepository(Poi).save(req.body);
      res.status(201).send("Created point of interest");
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  },

  // UPDATE POI BY ID

  updatePoi: async (req: Request, res: Response): Promise<void> => {
    // VALIDATOR {id: uuid, description: string, address: string, is_accepted: boolean, created_ad: timestamp, updated_at: timestamp,
    // name: string, image: string, categoryId: uuid, cityId: uuid, userId: uuid, coordinates: [x, y] }
    // les 3 clés étrangères peuvent être null mais sinon uuid

    try {
      const { id } = req.params;
      const { coordinates } = req.body;

      // check if POI exists in db
      const poiToUpdate = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToUpdate === null) {
        res.status(404).send("Point of interest not found");
        return;
      }

      // check if body.coords already exists in db
      if (coordinates !== undefined) {
        const coordsAlreadyExist = await dataSource.getRepository(Poi).count({
          where: {
            coordinates: {
              type: "Point",
              coordinates: [coordinates[0], coordinates[1]],
            },
            id: Not(id),
          },
        });
        if (coordsAlreadyExist > 0) {
          res.status(404).send("Point of interest already exist");
          return;
        }

        // format coordinates
        req.body.coordinates = {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]],
        };
      }

      // rename the new file and delete the older one
      if (req.file) {
        // rename
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/poi/${filename}`,
          `./public/poi/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/poi/${newName}`;
        // delete
        if (poiToUpdate.image !== null) {
          await unlink("." + poiToUpdate.image);
        }
      }

      await dataSource.getRepository(Poi).update(id, req.body);
      res.status(200).send("Updated point of interest");
    } catch (err) {
      res.status(400).send("Error while updating point of interest");
    }
  },

  // DELETE POI

  deletePoi: async (req: Request, res: Response): Promise<void> => {
    // VALIDATOR verifier id isUUID
    try {
      const { id } = req.params;
      // check if POI exists in db
      const poiToDelete = await dataSource.getRepository(Poi).findOneBy({ id });
      if (poiToDelete === null) {
        res.status(404).send("Point of interest not found");
        return;
      }

      await dataSource.getRepository(Poi).delete(id);

      // delete image in public directory
      if (poiToDelete.image !== null) {
        await unlink("." + poiToDelete.image);
      }

      res.status(200).send("Deleted point of interest");
    } catch (err) {
      res.status(400).send("Error while deleting point of interest");
    }
  },
};
