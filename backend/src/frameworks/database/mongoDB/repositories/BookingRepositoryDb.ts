import { BookingEntityInterface } from "../../../../entities/booking";
import Booking from "../models/bookingModel";

export default function bookingRepositoryDb() {
  const createBooking = async (bookingEntity: BookingEntityInterface) => {

    console.log(bookingEntity.getName())
    const newBooking = new Booking({
      name: bookingEntity.getName(),
      phoneNumber: bookingEntity.getPhoneNumber(),
      email: bookingEntity.getEmail(),
      address: bookingEntity.getAddress(),
      roomId: bookingEntity.getRoomId(),
      hotelId: bookingEntity.getHotelId(),
      userId: bookingEntity.getUserId(),
      maxPeople: bookingEntity.getMaxPeople(),
      checkInDate: bookingEntity.checkInDate(),
      checkOutDate: bookingEntity.checkOutDate(),
    });

    newBooking.save();

    return newBooking;
  };

  const getAllBooking = async () => {
    const bookings = await Booking.find();

    return bookings;
  };

  const getBooking = async (id: string) => await Booking.findById(id);

  const deleteBooking = async (id:string) => await Booking.deleteOne({_id: id});

  const updateBooking =async (id: string, updates:any) => await Booking.updateOne({_id:id}, {
    $set: updates
  })

  const getAllBookingsOfUser = async (userId: string) => {
    const bookings = await Booking.find({userId: userId});

    return bookings;
  };



  return {
    createBooking,
    getAllBooking,
    getBooking,
    deleteBooking,
    updateBooking,
    getAllBookingsOfUser
  };
}

export type BookingRepositoryDbType = typeof bookingRepositoryDb