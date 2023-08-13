import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";



export default async function getBookingDetails(
    bookingId: string | undefined,
    respository: ReturnType<BookingRepositoryDbType>
){

    if(!bookingId){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    const booking = await respository.getBooking(bookingId);


    return booking

}