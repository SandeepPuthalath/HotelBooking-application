import mongoose, { mongo } from "mongoose";
import { BookingEntityInterface } from "../../entities/booking";
import { BookingRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";

export default function bookingRepository(
  repository: ReturnType<BookingRepositoryDbType>
) {
  const createBooking = async (bookingEntity: BookingEntityInterface) =>
    await repository.createBooking(bookingEntity);

  const getAllBooking = async () => await repository.getAllBooking();

  const getBooking = async (bookingId: string) =>
    await repository.getBooking(bookingId);

  const deleteBooking = async (bookingId: string) =>
    await repository.deleteBooking(bookingId);

  const updateBooking = async (bookingId: string, updates: any) =>
    await repository.updateBooking(bookingId, updates);

  const getAllBookingsOfUser = async (userId:string, page: number, limit: number) => await repository.getAllBookingsOfUser(userId, page, limit);

  const getAllBookingOfHotel =async (hotelId:string, page: number, limit: number) => await repository.getAllBookingOfHotel(hotelId, page, limit);

  const changeStatus = async (bookingId: string, status: string) => await repository.changeStatus(bookingId, status);

  const getMonthlyRevenu = async (hotelId: mongoose.Types.ObjectId) => await repository.getMonthlyRevenu(hotelId);

  const getYearlyRevenu = async (hotelId: mongoose.Types.ObjectId) => await repository.getYearlyRevenu(hotelId);

  const getTotalBookings = async (hotelId: mongoose.Types.ObjectId) => await repository.getTotalBookings(hotelId);

  const changePaymentStatus = async (id: mongoose.Types.ObjectId | string, paymentMethod: string) => await repository.changePaymentStatus(id, paymentMethod);

  const getBookingDetailsOfUser = async (id: mongoose.Types.ObjectId) => await repository.getBookingDetailsOfUser(id);

  return {
    createBooking,
    getAllBooking,
    getBooking,
    deleteBooking,
    updateBooking,
    getAllBookingsOfUser,
    getAllBookingOfHotel,
    changeStatus,
    getMonthlyRevenu,
    getYearlyRevenu,
    getTotalBookings,
    changePaymentStatus,
    getBookingDetailsOfUser
  };
}

export type BookingRepository = typeof bookingRepository;
