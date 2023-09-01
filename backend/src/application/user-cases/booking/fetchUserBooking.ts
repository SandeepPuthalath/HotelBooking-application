import mongoose from "mongoose";
import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

export default async function fetchUserBooking(
  id: string,
  repository: ReturnType<BookingRepositoryDbType>
) {
    if(!id){
        throw new AppError("The booking dose not exists", HttpStatus.NOT_FOUND);
    }

    const booking = await repository.getBookingDetailsOfUser(new mongoose.Types.ObjectId(id));
    
    return booking;
}
