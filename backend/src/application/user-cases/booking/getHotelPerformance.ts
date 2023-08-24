import mongoose from "mongoose";
import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function getHotelPerformance(
  hotelId: string | undefined,
  repository: ReturnType<BookingRepositoryDbType>
) {
  if (!hotelId) {
    throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
  }

  const monthlyRevenu = await repository.getMonthlyRevenu(new mongoose.Types.ObjectId(hotelId));

  const yearlyRevenu = await repository.getYearlyRevenu(new mongoose.Types.ObjectId(hotelId));

  const totalBookings = await repository.getTotalBookings(new mongoose.Types.ObjectId(hotelId))

  return {
    monthlyRevenu,
    yearlyRevenu,
    totalBookings,
  }
}

