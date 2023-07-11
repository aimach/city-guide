import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Category } from "../entities/Category";
import { Not } from "typeorm";
import { IController } from "./user-controller";
import fs from "fs";
import { unlink } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

export const CategoryController: IController = {
  // GET ALL CATEGORIES

  getCategories: async (req: Request, res: Response): Promise<void> => {
    try {
      const allCategories = await dataSource.getRepository(Category).find();
      res.status(200).send(allCategories);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading categories" });
    }
  },

  // GET ONE CATEGORY BY ID

  getOneCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const categoryToRead = await dataSource
        .getRepository(Category)
        .findOneBy({ id });
      if (categoryToRead === null) {
        res.status(404).send({ error: "Category not found" });
      } else {
        res.status(200).send(categoryToRead);
      }
    } catch (err) {
      res.status(400).send({ error: "Error while reading category" });
    }
  },

  // CREATE CATEGORY

  createCategory: async (req: Request, res: Response): Promise<void> => {
    // validate format
    const checkIfEmptyAndNotAString = (value: string): void => {
      if (validator.isEmpty(value, { ignore_whitespace: true })) {
        res.status(422).send({ error: `Please fill the empty field` });
      }
      if (typeof value !== "string") {
        res.status(400).send({ error: `Field must contains only characters` });
      }
    };

    try {
      const { name } = req.body;

      const inputs: string[] = Object.values(req.body);
      inputs.forEach((value) => checkIfEmptyAndNotAString(value));

      // Check format of category's name
      if (
        !validator.matches(
          name,
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
        )
      ) {
        res.status(400).send({
          error: `Field must contains only characters (min: 2, max: 100)`,
        });
        return;
      }

      // check if category name already exists in db
      const nameAlreadyExist = await dataSource
        .getRepository(Category)
        .count({ where: { name } });
      if (nameAlreadyExist > 0) {
        res.status(409).send({
          error: `Category already exists`,
        });
        return;
      }

      // rename file image
      if (req.file) {
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/category/${filename}`,
          `./public/category/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/category/${newName}`;
      }

      await dataSource.getRepository(Category).save(req.body);
      res.status(201).send("Created category");
    } catch (error) {
      res.status(400).send({ error: "Something went wrong" });
    }
  },

  // UPDATE CATEGORY BY ID

  updateCategory: async (req: Request, res: Response): Promise<void> => {
    // validate format

    const checkIfEmptyAndNotAString = (value: string): void => {
      if (validator.isEmpty(value, { ignore_whitespace: true })) {
        res.status(422).send({ error: `Please fill the empty field` });
      }
      if (typeof value !== "string") {
        res.status(400).send({ error: `Field must contains only characters` });
      }
    };

    try {
      const { id } = req.params;
      const { name } = req.body;

      const inputs: string[] = Object.values(req.body);
      inputs.forEach((value) => checkIfEmptyAndNotAString(value));

      if (
        !validator.matches(
          name,
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
        )
      ) {
        res.status(400).send({
          error: `Field must contains only characters (min: 2, max: 100)`,
        });
        return;
      }

      // check if the category exists in db
      const categoryToUpdate = await dataSource
        .getRepository(Category)
        .findOneBy({ id });

      if (categoryToUpdate === null) {
        res.status(404).send({ error: "Category not found" });
        return;
      }

      // check if body.name already exists in db
      if (name) {
        const nameAlreadyExist = await dataSource
          .getRepository(Category)
          // check every tuples except the one updating
          .count({ where: { name, id: Not(id) } });

        if (nameAlreadyExist > 0) {
          res.status(409).send({ error: "Category name already exist" });
          return;
        }
      }

      // rename the new file and delete the old one
      if (req.file) {
        // rename
        const originalname = req.file.originalname;
        const filename = req.file.filename;
        const newName = `${uuidv4()}-${originalname}`;
        fs.rename(
          `./public/category/${filename}`,
          `./public/category/${newName}`,
          (err) => {
            if (err) throw err;
          }
        );
        req.body.image = `/public/category/${newName}`;
        // delete
        if (categoryToUpdate.image !== null) {
          await unlink("." + categoryToUpdate.image);
        }
      } else {
        res.status(400).send({ error: "An image is required" });
      }

      await dataSource.getRepository(Category).update(id, req.body);
      res.status(200).send("Updated category");
    } catch (err) {
      res.status(400).send({ error: "Error while updating category" });
    }
  },

  // DELETE CATEGORY BY ID

  deleteCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      // check if category exists in db
      const categoryToDelete = await dataSource
        .getRepository(Category)
        .findOneBy({ id });
      if (categoryToDelete === null) {
        res.status(404).send({ error: "Category not found" });
        return;
      }

      await dataSource.getRepository(Category).delete(id);

      // delete image in public directory
      if (categoryToDelete.image !== null) {
        await unlink("." + categoryToDelete.image);
      }

      res.status(200).send("Deleted category");
    } catch (err) {
      res.status(400).send({ error: "Error while deleting category" });
    }
  },
};
