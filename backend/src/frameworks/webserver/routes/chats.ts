import express from "express";
import chatsController from "../../../adapters/chatsController/chatsController";
import messageRepository from "../../../application/repositories/messageRepository";
import messageRepositoryDB from "../../database/mongoDB/repositories/messageRepositoryDB";

export default function chatRouter() {
  const router = express.Router();
  const controller = chatsController(messageRepository, messageRepositoryDB);

  router.route("/").get(controller.handleFetchingMessages);

  return router;
}
