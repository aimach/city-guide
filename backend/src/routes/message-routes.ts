import express from "express";
import { MessageController } from "../controllers/messageController";
import { auth } from "../middlewares/auth";

export const messageRoutes = express.Router();

messageRoutes.get("/", auth, MessageController.getMessages);

messageRoutes.post("/", MessageController.createMessage);

messageRoutes.delete("/:id", MessageController.deleteMessage);
