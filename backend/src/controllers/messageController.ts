import { IController } from "./user-controller";
import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Message } from "../entities/Message";
import { User, UserRole } from "../entities/User";
import validator from "validator";

export const MessageController: IController = {
  // GET ALL MESSAGES

  getMessages: async (req: Request, res: Response): Promise<void> => {
    try {
      const allMessages = await dataSource.getRepository(Message).find();
      res.status(200).send(allMessages);
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading messages" });
    }
  },

  createMessage: async (req: Request, res: Response): Promise<void> => {
    const { email, title, message } = req.body;

    const checkIfEmpty = (key: string, value: string): boolean => {
      if (validator.isEmpty(value, { ignore_whitespace: true })) {
        res.status(422).send({ errors: { [key]: "Ce champ est requis" } });
        return true;
      }
      return false;
    };

    try {
      const messageToCreate = new Message();
      messageToCreate.email = email;
      messageToCreate.title = title;
      messageToCreate.message = message;

      const inputs: string[] = ["email", "title", "message"];

      const someError: boolean = inputs.some((key) =>
        checkIfEmpty(key, req.body[key])
      );
      if (someError) return;

      const newMessage = { ...messageToCreate };
      await dataSource.getRepository(Message).save(newMessage);
      res.status(201).send(newMessage);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erreur serveur");
    }
  },

  deleteMessage: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const messageToDelete = await dataSource
        .getRepository(Message)
        .findOne({ where: { id } });
      if (messageToDelete === null) {
        res.status(404).send({ error: "Message not found" });
        return;
      }

      const { userId } = req.params;

      const currentUser = await dataSource
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (currentUser?.role !== UserRole.ADMIN) {
        res.status(403).send({
          error: "You are not authorized to delete a message",
        });
        return;
      }

      await dataSource.getRepository(Message).delete(id);
      res.status(200).send("Deleted message");
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: "Error while reading messages" });
    }
  },
};
