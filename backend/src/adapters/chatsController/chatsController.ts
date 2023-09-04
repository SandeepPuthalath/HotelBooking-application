import expressAsyncHandler from "express-async-handler";
import { MessageRepository } from "../../application/repositories/messageRepository";
import { MessageRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/messageRepositoryDB";
import { NextFunction, Request, Response } from "express";
import fetchChats from "../../application/user-cases/chat/fetchChats";
import { HttpStatus } from "../../types/httpStatus";

export default function chatsController(
  messageRepository: MessageRepository,
  messageRepositoryDB: MessageRepositoryDBType
) {
  const repository = messageRepository(messageRepositoryDB());

  const handleFetchingMessages = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const hotelId = req.query.hotelId as string;

      const messages = await fetchChats(hotelId, repository);
      res.status(HttpStatus.OK).json(messages);
    }
  );

  return {
    handleFetchingMessages,
  };
}
