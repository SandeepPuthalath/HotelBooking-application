import mongoose from "mongoose";
import booking, { BookingEntityInterface } from "../../../../entities/booking";
import Booking from "../models/bookingModel";

export default function bookingRepositoryDb() {
  const createBooking = async (bookingEntity: BookingEntityInterface) => {
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
      price: bookingEntity.getPrice(),
    });

    newBooking.save();

    return newBooking;
  };

  const getAllBooking = async () => {
    const bookings = await Booking.find();

    return bookings;
  };

  const getBooking = async (id: string) => await Booking.findById(id);

  const deleteBooking = async (id: string) =>
    await Booking.updateOne({ _id: id }, { $set: { status: "cancelled" } });

  const updateBooking = async (id: string, updates: any) =>
    await Booking.updateOne(
      { _id: id },
      {
        $set: updates,
      }
    );

  const getAllBookingsOfUser = async (userId: string) => {
    const bookings = await Booking.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "hotels", // Collection name for the Hotel model
          localField: "hotelId",
          foreignField: "_id",
          as: "hotelInfo",
        },
      },
      {
        $lookup: {
          from: "rooms", // Collection name for the Room model
          localField: "roomId",
          foreignField: "_id",
          as: "roomInfo",
        },
      },
      {
        $unwind: "$hotelInfo",
      },
      {
        $unwind: "$roomInfo",
      },
      {
        $project: {
          name: 1,
          phoneNumber: 1,
          email: 1,
          address: 1,
          maxPeople: 1,
          checkInDate: 1,
          checkOutDate: 1,
          price: 1,
          status: 1,
          hotelInfo: {
            _id: 1,
            name: 1,
            destination: 1,
            address: 1,
            // Include other hotel fields you want
          },
          roomInfo: {
            _id: 1,
            title: 1,
            // Include other room fields you want
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    return bookings;
  };

  const getAllBookingOfHotel = async (hotelId: string) =>
    await Booking.find({ hotelId: hotelId });

  const changeStatus = async (id: string, status: string) =>
    Booking.findByIdAndUpdate(id)
      .exec()
      .then((booking: any) => {
        console.log(booking);
        booking.status = status;
        booking.save();

        return booking;
      });

  return {
    createBooking,
    getAllBooking,
    getBooking,
    deleteBooking,
    updateBooking,
    getAllBookingsOfUser,
    getAllBookingOfHotel,
    changeStatus,
  };
}

export type BookingRepositoryDbType = typeof bookingRepositoryDb;
