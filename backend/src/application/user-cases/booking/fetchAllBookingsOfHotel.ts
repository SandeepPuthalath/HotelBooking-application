import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";





export default async function fetchAllBookingsOfHotel(hotelId: string, repository: ReturnType<BookingRepositoryDbType>){

    if(!hotelId){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    const bookings = await repository.getAllBookingOfHotel(hotelId);

    return bookings;
}