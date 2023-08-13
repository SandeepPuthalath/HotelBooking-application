import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";




export default async function cancdelBooking(bookingId: string, repository: ReturnType<BookingRepositoryDbType>){
    console.log(bookingId)
    if(!bookingId){
        throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
    }

    return await repository.deleteBooking(bookingId);
}