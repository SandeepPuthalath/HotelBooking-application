import {
  RoomType,
  RoomsRepositoryDbInterface,
} from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import createRoomEntity from "../../../entities/room";
import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";

export default async function addRoom(
  hotelId: string, 
  room: RoomType,
  roomRepository: ReturnType<RoomsRepositoryDbInterface>,
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {

  const hotel = await hotelRepository.view(new mongoose.Types.ObjectId(hotelId));

  if(!hotel){
    throw new AppError("Your account is not registerd with any Hotel", HttpStatus.BAD_REQUEST);
  }

  const { title, price, maxPeople, desc, photos } = room;

  if (!title || !price || !maxPeople || !desc) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  const newRoom = createRoomEntity(hotelId, title, price, maxPeople, desc, photos);

  const data = await roomRepository.createRoom(newRoom);

  await hotel.save()

  return data;
}
