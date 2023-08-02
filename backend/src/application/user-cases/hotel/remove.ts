import mongoose from "mongoose";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";

export default async function remove(
  id: mongoose.Types.ObjectId,
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {
  if (!id) {
    throw new AppError("Hotel dose not exist", HttpStatus.NOT_FOUND);
  }

  await hotelRepository.remove(id)

  return true
}
