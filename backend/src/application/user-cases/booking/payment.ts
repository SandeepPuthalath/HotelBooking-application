import mongoose from "mongoose";
import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { PaymentServicesType } from "../../../frameworks/services/paymentServices";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

export default async function payment(
  bookingId: string,
  paymentMethod: string,
  paymentServices: ReturnType<PaymentServicesType>,
  bookingResp: ReturnType<BookingRepositoryDbType>,
  roomRepo: ReturnType<RoomsRepositoryDbInterface>
) {
  const bookingDetails: any = await bookingResp.changePaymentStatus(
    bookingId,
    paymentMethod
  );
  // console.log("booking details afte update...", bookingDetails);
  if (!bookingDetails) {
    throw new AppError("There is no such booking", HttpStatus.NOT_FOUND);
  }
  const roomId = bookingDetails?.roomId;
  const roomDetails: any = await roomRepo.readRoom(roomId);

  if (!roomDetails) {
    throw new AppError("Room cannot be found", HttpStatus.NOT_FOUND);
  }
  console.log(roomDetails);
  switch (paymentMethod) {
    case "stripe":
      return await paymentServices.generateStripePaymentUrl(
        bookingId,
        roomDetails?.title,
        bookingDetails?.price * 100
      );
    default:
      return bookingDetails;
  }
}
