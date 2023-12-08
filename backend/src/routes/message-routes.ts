import express from "express";
import { MessageController } from "../controllers/messageController";

export const messageRoutes = express.Router();

messageRoutes.post("/", MessageController.createMessage);
