import { BookingRepositoryDbType } from "../../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import createBookingEntity from "../../../entities/booking";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";

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
    !checkOutDate
  ) {
    
    throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
  }
  //creating booking entities

  const bookingEntity = createBookingEntity(
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
  );



  const data = await bookingRepo.createBooking(bookingEntity);

  const dates = createDateArray(checkInDate, checkOutDate);

  await roomRepo.updateUnavailableDates(roomId, dates);

  return data;
}
