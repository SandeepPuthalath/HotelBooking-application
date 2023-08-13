import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import createBookingEntity from "../../../entities/booking";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import mongoose from "mongoose";

export const createDateArray = (startDate: string, endDate:string) => {

  const currentDate = new Date(startDate)
  const datesArray = [];

  while(currentDate <= new Date(endDate)){
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return datesArray
}

interface BookingInterface {
  name: string;
  phoneNumber: number;
  email: string;
  address: string;
  roomId: string;
  hotelId: string;
  userId: string;
  maxPeople: number;
  checkInDate: string;
  checkOutDate: string;
  price: number
}

export default async function booking(
  bookingDetails: BookingInterface,
  bookingRepo: ReturnType<BookingRepositoryDbType>,
  roomRepo: ReturnType<RoomsRepositoryDbInterface>
) {
  const {
    name,
    phoneNumber,
    email,
    address,
    roomId,
    hotelId,
    userId,
    maxPeople,
    checkInDate,
    checkOutDate,
    price
  } = bookingDetails;

  if (
    !name ||
    !phoneNumber ||
    !email ||
    !address ||
    !roomId ||
    !hotelId ||
    !userId ||
    !maxPeople ||
    !checkInDate ||
    !checkOutDate ||
    !price
  ) {
    
    throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
  }
  //creating booking entities

  const bookingEntity = createBookingEntity(
    name,
    phoneNumber,
    email,
    address,
    new mongoose.Types.ObjectId(roomId),
    new mongoose.Types.ObjectId(hotelId),
    new mongoose.Types.ObjectId(userId),
    maxPeople,
    checkInDate,
    checkOutDate,
    price
  );



  const data = await bookingRepo.createBooking(bookingEntity);

  const dates = createDateArray(checkInDate, checkOutDate);

  await roomRepo.updateUnavailableDates(roomId, dates);

  return data;
}
