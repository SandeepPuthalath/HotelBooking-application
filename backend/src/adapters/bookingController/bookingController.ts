import expressAsyncHandler from "express-async-handler";
import { BookingRepository } from "../../application/repositories/BookingRepository";
import { BookingRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/httpStatus";
import createBooking from "../../application/user-cases/booking/createBooking";
import { RoomRepositoryInterface } from "../../application/repositories/roomRepository";
import { RoomsRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import getAllUserBookings from "../../application/user-cases/booking/getAllUserBookings";

export default function bookingController(
  bookingRepoInt: BookingRepository,
  bookingRepoDbImp: BookingRepositoryDbType,
  roomRepoInt: RoomRepositoryInterface,
  roomRepoImp: RoomsRepositoryDbInterface
) {
  const bookingRepo = bookingRepoInt(bookingRepoDbImp());
  const roomRepo = roomRepoInt(roomRepoImp());

  const handleBooking = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bookingDetails = req.body;
      const data = await createBooking(bookingDetails, bookingRepo, roomRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel room has been booked successfully",
        data: data,
      });
    }
  );

  const handleGetAllBookings = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

      const { userId } = req.params;

      const data = await getAllUserBookings(userId, bookingRepo);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          messaage: "All Bookings has been fetched",
          data: data,
        });
    }
  );

  return {
    handleBooking,
    handleGetAllBookings,
  };
}
