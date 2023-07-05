import { Request, Response } from "express";
import dataSource from "../dataSource";
import { User } from "../entities/User";

export default class ProfileController {
  // profileController.getOneProfile
  async getOneProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params;
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

  // profileController.updateProfile
  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params;
      const profileToUpdate = await dataSource
        .getRepository(User)
        .findOneBy({ id });
      if (profileToUpdate === null) {
        res.status(404).send("User not found");
      } else {
        await dataSource.getRepository(User).update(id, {
          // à modifier en fonction du contenu
        });
        res.status(200).send("Updated user");
      }
    } catch (err) {
      res.status(400).send("Error while updating user");
    }
  }

  // profileController.deleteProfile
  async deleteProfile(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params;
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
}
