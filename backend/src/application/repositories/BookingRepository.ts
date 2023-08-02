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

  const getAllBookingsOfUser = async (userId:string) => await repository.getAllBookingsOfUser(userId)

  return {
    createBooking,
    getAllBooking,
    getBooking,
    deleteBooking,
    updateBooking,
    getAllBookingsOfUser,
  };
}

export type BookingRepository = typeof bookingRepository;
