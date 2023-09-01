import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";




export default async function getAllUserBookings(
    userId: string,
    page: number,
    limit: number,
    bookingRepo: ReturnType<BookingRepositoryDbType>
){

    if(!userId){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    const data = await bookingRepo.getAllBookingsOfUser(userId, page, limit);

   return data
}