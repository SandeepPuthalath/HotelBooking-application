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
import getHotelPerformance from "../../application/user-cases/booking/getHotelPerformance";
import { PaymentServiceInterface } from "../../application/services/paymentServiceInterface";
import { PaymentServicesType } from "../../frameworks/services/paymentServices";
import payment from "../../application/user-cases/booking/payment";
import fetchUserBooking from "../../application/user-cases/booking/fetchUserBooking";

export default function bookingController(
  bookingRepoInt: BookingRepository,
  bookingRepoDbImp: BookingRepositoryDbType,
  roomRepoInt: RoomRepositoryInterface,
  roomRepoImp: RoomsRepositoryDbInterface,
  paymentInt: PaymentServiceInterface,
  paymetnImp: PaymentServicesType,
) {
  const bookingRepo = bookingRepoInt(bookingRepoDbImp());
  const roomRepo = roomRepoInt(roomRepoImp());
  const payments = paymentInt(paymetnImp());

  const handleBooking = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bookingDetails = req.body;
      const data = await createBooking(bookingDetails, bookingRepo, roomRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Hotel room has been booked successfully",
        booking: data,
      });
    }
  );

  const handlePayment = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("in payment section");

      const { paymentMethod } = req.body;
      const id : any= req.query.id
      console.log(id, paymentMethod)
      const data = await payment(id , paymentMethod, payments, bookingRepo, roomRepo);

      console.log(data)

      res.status(HttpStatus.OK).json({status: "success", message: "payment has been successfull", url: data?.url});

    }
  );

  const handleGetAllBookingsOfUser = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { userId } = req.params;
      const page = parseInt(req.query?.page as string);
      const limit = parseInt(req.query?.limit as string);

      const data = await getAllUserBookings(userId, page, limit, bookingRepo);

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
      const page = parseInt(req.query?.page as string);
      const limit = parseInt(req.query?.limit as string);
      console.log("pagination parameters",page, limit)

      const bookings = await fetchAllBookingsOfHotel(hotelId,page, limit, bookingRepo);

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

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Successfully updated booking status",
      });
    }
  );

  const handleFetchingHotelPerformance = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const hotelId = req.query?.hotelId?.toString();

      const { monthlyRevenu, yearlyRevenu, totalBookings } =
        await getHotelPerformance(hotelId, bookingRepo);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "successfully fetched performance",
        monthlyRevenu,
        yearlyRevenu,
        totalBookings,
      });
    }
  );


  const handleGetBookingDetailsOfUser = expressAsyncHandler(async (req, res) =>{
    const {id} = req.params
    const bookingDetails = await fetchUserBooking(id, bookingRepo);
    res.status(HttpStatus.OK).json({
      status: "success",
      message: "Successfully fetched data",
      bookingDetails:bookingDetails[0]
    })
  })

  return {
    handleBooking,
    handleGetAllBookingsOfUser,
    handleCancelBooking,
    handleGettingAllBookingOfHotel,
    handleFetchingBookingDetails,
    handleStatsuChange,
    handleFetchingHotelPerformance,
    handlePayment,
    handleGetBookingDetailsOfUser
  };
}
