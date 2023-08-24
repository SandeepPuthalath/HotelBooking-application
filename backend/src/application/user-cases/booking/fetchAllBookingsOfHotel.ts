import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";





export default async function fetchAllBookingsOfHotel(hotelId: string, page:number, limit: number, repository: ReturnType<BookingRepositoryDbType>){

    if(!hotelId){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    const bookings = await repository.getAllBookingOfHotel(hotelId, page, limit);

    return bookings;
}