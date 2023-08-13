import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";



export default async function changeBookingStatus(
    bookingId: string | undefined,
    status: string | undefined,
    respository: ReturnType<BookingRepositoryDbType>
){
    console.log("in booking change status use case", bookingId, status)
    
    if(!bookingId || !status){
        throw new AppError("Bad Request", HttpStatus.BAD_REQUEST)
    }

    return await respository.changeStatus(bookingId, status);

}