import mongoose from "mongoose";
import { MessageRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/messageRepositoryDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";



export default async function fetchChats(hotelId:string, repository: ReturnType<MessageRepositoryDBType>) {
    if(!hotelId){
        throw new AppError("Something went wrong", HttpStatus.BAD_REQUEST);
    }

    const messages = await repository.getMessages(new mongoose.Types.ObjectId(hotelId));

    return messages? messages : []
}