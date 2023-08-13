import expressAsyncHandler from "express-async-handler";
import { BookingRepository } from "../../application/repositories/BookingRepository";
import { BookingRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/httpStatus";
import createBooking from "../../application/user-cases/booking/createBooking";
import { RoomRepositoryInterface } from "../../application/repositories/roomRepository";
import { RoomsRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import getAllUserBookings from "../../application/user-cases/booking/getAllUserBookings";
import cancdelBooking from "../../application/user-cases/booking/cancelBooking";
import fetchAllBookingsOfHotel from "../../application/user-cases/booking/fetchAllBookingsOfHotel";
import getBookingDetails from "../../application/user-cases/booking/getBookingDetails";
import changeBookingStatus from "../../application/user-cases/booking/changeBookingStatus";

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
      });
    }
  );

  const handleGetAllBookingsOfUser = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.params;

      const data = await getAllUserBookings(userId, bookingRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        messaage: "All Bookings has been fetched",
        data: data,
      });
    }
  );

  const handleCancelBooking = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { bookingId } = req.params;

      const data = await cancdelBooking(bookingId, bookingRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        messaage: `${bookingId?.substring(0, 10)} has been cancelled`,
      });
    }
  );

  const handleGettingAllBookingOfHotel = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { hotelId } = req.params;

      const bookings = await fetchAllBookingsOfHotel(hotelId, bookingRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        messaage: "All bookings has been fetched",
        bookings: bookings,
      });
    }
  );

  const handleFetchingBookingDetails = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bookingId = req.query["bookingId"]?.toString();

      const booking = await getBookingDetails(bookingId, bookingRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Booking details has been fetched successfully",
        booking,
      });
    }
  );

  const handleStatsuChange = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
     
      const bookingId = req.query?.bookingId?.toString();
      const status = req.query?.status?.toString();

      await changeBookingStatus(bookingId, status, bookingRepo);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "Successfully updated booking status",
        });
    }
  );

  return {
    handleBooking,
    handleGetAllBookingsOfUser,
    handleCancelBooking,
    handleGettingAllBookingOfHotel,
    handleFetchingBookingDetails,
    handleStatsuChange,
  };
}
