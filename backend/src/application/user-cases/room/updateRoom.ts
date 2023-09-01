import mongoose from "mongoose";
import { RoomType, RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function updateRoom(
  id: string,
  updates: RoomType,
  repository: ReturnType<RoomsRepositoryDbInterface>
) {
    if(!id || !updates){
        throw new AppError("Please provide updated values", HttpStatus.NOT_FOUND)
    }

    const data = await repository.updateRoom(new mongoose.Types.ObjectId(id), updates);
    console.log(data)

    return data
}
