import mongoose from "mongoose";
import { MessageRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/messageRepositoryDB";




export default function messageRepository(repository: ReturnType<MessageRepositoryDBType>){
    
    const getMessages = async (hotelId: mongoose.Types.ObjectId) => await repository.getMessages(hotelId)

    const addMessage = async (
      user: mongoose.Types.ObjectId,
      hotel: mongoose.Types.ObjectId,
      message: string,
      sender: mongoose.Types.ObjectId
    ) => await repository.addMessage(user, hotel, message, sender);

    return {
        addMessage,
        getMessages,
    }
}

export type MessageRepository = typeof messageRepository