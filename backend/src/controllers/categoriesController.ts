import dataSource from "../dataSource";
import { Category } from "../models/Category";

export default class CategoryController {
  // categoriesController.getCategories
  async getCategories(req, res) {
    try {
      const allCategories = await dataSource.getRepository(Category).find();
      res.status(200).send(allCategories);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error while reading categories");
    }
  }

  // categoriesController.createCategory
  async create(req, res) {
    try {
      const createCategory = await dataSource
        .getRepository(Category)
        .save(req.body);
      // vérifier que ça a bien été créé dans la bdd
      res.status(201).send("Created skill");
    } catch (err) {
      if (err.code === "SQLITE_CONSTRAINT") {
        res.status(409).send("Category already exists");
      }
      res.status(400).send("Something went wrong");
    }
  }

  // categoriesController.getOneCategory
  // la route n'existe pas mais j'ai créé le controller au cas où

  async getOneCategory(req, res) {
    try {
      const id = req.params;
      const categoryToRead = await dataSource
        .getRepository(Category)
        .findOneBy({ id });
      if (categoryToRead === null) {
        res.status(404).send("Category not found");
      } else {
        res.stats(200).send(categoryToRead);
      }
    } catch (err) {
      res.status(400).send("Error while reading category");
    }
  }

  // categoriesController.updateCategory
  async updateCategory(req, res) {
    try {
      const id = req.params;
      const categoryToUpdate = await dataSource
        .getRepository(Category)
        .findOneBy({ id });
      if (categoryToUpdate === null) {
        res.status(404).send("Category not found");
      } else {
        await dataSource.getRepository(Category).update(id, {
          // à modifier en fonction du contenu
        });
        res.status(200).send("Updated category");
      }
    } catch (err) {
      res.status(400).send("Error while updating category");
    }
  }

  // categoriesController.deleteCategory
  async deleteProfile(req, res) {
    try {
      const id = req.params;
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
  }
}
