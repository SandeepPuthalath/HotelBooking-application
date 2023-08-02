import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

export default async function getAllRoooms(
  hotelId: string,
  roomRepository: ReturnType<RoomsRepositoryDbInterface>,
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {
  const hotel = await hotelRepository.view(
    new mongoose.Types.ObjectId(hotelId)
  );

  if (!hotel) {
    throw new AppError(
      "Your account is not registerd with any Hotel",
      HttpStatus.BAD_REQUEST
    );
  }

  const data = await roomRepository.readRoomByProp(new mongoose.Types.ObjectId(hotelId))

  return data
}
