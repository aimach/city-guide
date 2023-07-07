import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Category } from "../entities/Category";
import { Not } from "typeorm";
import { IController } from "./user-controller";

export const CategoryController: IController = {
  // GET ALL CATEGORIES

  getCategories: async (req: Request, res: Response): Promise<void> => {
    try {
      const allCategories = await dataSource.getRepository(Category).find();
      res.status(200).send(allCategories);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading categories");
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
        res.status(404).send("Category not found");
      } else {
        res.status(200).send(categoryToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading category");
    }
  },

  // CREATE CATEGORY

  createCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      // check if category name already exists in db
      const categoryToCreate = await dataSource
        .getRepository(Category)
        .count({ where: { name } });
      if (categoryToCreate > 0) {
        res.status(409).send("Category already exists");
      } else {
        await dataSource.getRepository(Category).save(req.body);
        res.status(201).send("Created category");
      }
    } catch (error) {
      res.status(400).send("Something went wrong");
    }
  },

  // UPDATE CATEGORY BY ID

  updateCategory: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      // check if category exists in db
      const categoryToUpdate = await dataSource
        .getRepository(Category)
        .findOneBy({ id });
      if (categoryToUpdate === null) {
        res.status(404).send("Category not found");
      } else {
        // check if body.name already exists in db
        const nameAlreadyExist = await dataSource
          .getRepository(Category)
          // check every tuples except the one updating
          .count({ where: { name, id: Not(id) } });
        if (nameAlreadyExist > 0) {
          res.status(409).send("Category name already exist");
        } else {
          await dataSource.getRepository(Category).update(id, req.body);
          res.status(200).send("Updated category");
        }
      }
    } catch (err) {
      res.status(400).send("Error while updating category");
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
        res.status(404).send("Category not found");
      } else {
        await dataSource.getRepository(Category).delete(id);
        res.status(200).send("Deleted category");
      }
    } catch (err) {
      res.status(400).send("Error while deleting category");
    }
  },
};
