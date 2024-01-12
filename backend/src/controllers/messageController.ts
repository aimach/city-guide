import { IController } from "./user-controller";
import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Message } from "../entities/Message";
import validator from "validator";

export const MessageController: IController = {
  getMessages: async (req: Request, res: Response): Promise<void> => {
    try {
      const allMessages = await dataSource.getRepository(Message).find();
      console.log(allMessages);
      res.status(200).send(allMessages);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Error while reading messages" });
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
      res.status(500).send("Erreur serveur");
    }
  },
};
