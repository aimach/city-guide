import express from "express";
import { MessageController } from "../controllers/messageController";

export const messageRoutes = express.Router();

messageRoutes.get("/", MessageController.getMessages);

messageRoutes.post("/", MessageController.createMessage);

// messageRoutes.delete("/:id", MessageController.deleteMessage);
