import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function getRoomDetails(
  hotelId: string,
  roomId: string,
  hotelRep: ReturnType<hotelRepositoryDbInterface>,
  roomRep: ReturnType<RoomsRepositoryDbInterface>
) {
  if (!hotelId || !roomId) {
    throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
  }

  const hotel = await hotelRep.view(new mongoose.Types.ObjectId(hotelId));
  if(!hotel){
    throw new AppError("There is no registered hotel", HttpStatus.NOT_FOUND);
  }

  const data = roomRep.readRoom(new mongoose.Types.ObjectId(roomId))

  return data;

}
