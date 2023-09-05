import express from "express";
import bookingController from "../../../adapters/bookingController/bookingController";
import bookingRepository from "../../../application/repositories/BookingRepository";
import bookingRepositoryDb from "../../database/mongoDB/repositories/BookingRepositoryDb";
import roomRepository from "../../../application/repositories/roomRepository";
import roomsRepositoryDb from "../../database/mongoDB/repositories/roomsRepositoryDb";
import paymentServices from "../../services/paymentServices";
import paymentServicesInterface from "../../../application/services/paymentServiceInterface";
import walletRepository from "../../../application/repositories/walletRepository";
import walletRepositoryDB from "../../database/mongoDB/repositories/walletRepositoryDB";
import transactionRepository from "../../../application/repositories/transactionRepository";
import transactionRepositoryDB from "../../database/mongoDB/repositories/transactionRepositoryDB";

const bookingRouter = () => {
  const router = express.Router();

  const controller = bookingController(
    bookingRepository,
    bookingRepositoryDb,
    roomRepository,
    roomsRepositoryDb,
    paymentServicesInterface,
    paymentServices,
    walletRepository,
    walletRepositoryDB,
    transactionRepository,
    transactionRepositoryDB,
  );

  router
    .route("/")
    .post(controller.handleBooking)
    .put(controller.handlePayment)
    .get(controller.handleFetchingBookingDetails)
    .patch(controller.handleStatsuChange);

  router.get("/:userId", controller.handleGetAllBookingsOfUser);

  router.route("/:bookingId").patch(controller.handleCancelBooking);

  router.route("/details/:id").get(controller.handleGetBookingDetailsOfUser);

  router.get("/owner/:hotelId", controller.handleGettingAllBookingOfHotel);

  router.get("/hotel/performance", controller.handleFetchingHotelPerformance);

  router
    .route("/chart/:hotelId")
    .get(controller.handleFetchingChartsDatas);

  return router;
};

export default bookingRouter;
