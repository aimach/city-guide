import { IController } from "./user-controller";
import { Request, Response } from "express";
import dataSource from "../dataSource";
import { Message } from "../entities/Message";
import validator from "validator";

export const MessageController: IController = {
  createMessage: async (req: Request, res: Response): Promise<void> => {
    const { email, title, message } = req.body;
    console.log(req.body);

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
};
