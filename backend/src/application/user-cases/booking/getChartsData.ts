import mongoose from "mongoose";
import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function getChartsData(
  hotelId: string,
  repository: ReturnType<BookingRepositoryDbType>
) {
    if(!hotelId){
        throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
    }

    const weekly = await repository.getWeeklyBookings(new mongoose.Types.ObjectId(hotelId));

    return {
      weekly,
    }

}
