import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function addImage(
  hotelId: string,
  roomId: string,
  imgId: string,
  hotelRep: ReturnType<hotelRepositoryDbInterface>,
  roomRep: ReturnType<RoomsRepositoryDbInterface>
) {
  if (!hotelId || !roomId || !imgId) {
    throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
  }

  const hotel = await hotelRep.view(new mongoose.Types.ObjectId(hotelId));

  if (!hotel) {
    throw new AppError(
      "This account has not registered any hotel",
      HttpStatus.NOT_FOUND
    );
  }

  const data = await roomRep.addRoomImage(
    new mongoose.Types.ObjectId(roomId),
    imgId.toString()
  );

  return data;
}
