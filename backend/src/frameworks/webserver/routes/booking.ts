import express from "express"
import bookingController from "../../../adapters/bookingController/bookingController";
import bookingRepository from "../../../application/repositories/BookingRepository";
import bookingRepositoryDb from "../../database/mongoDB/repositories/BookingRepositoryDb";
import roomRepository from "../../../application/repositories/roomRepository";
import roomsRepositoryDb from "../../database/mongoDB/repositories/roomsRepositoryDb";


const bookingRouter = () =>{
    const router = express.Router();

    const controller = bookingController(bookingRepository, bookingRepositoryDb, roomRepository, roomsRepositoryDb);

    router.post('/',controller.handleBooking);

    router.get('/:userId', controller.handleGetAllBookings);

    return router
}


export default bookingRouter;