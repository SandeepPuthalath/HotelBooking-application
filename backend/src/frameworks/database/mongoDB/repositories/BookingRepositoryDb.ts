import mongoose, { mongo } from "mongoose";
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

  const getAllBookingsOfUser = async (
    userId: string,
    page: number,
    limit: number
  ) => {
    const bookings = await Booking.find({ userId });
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const results: any = {};
    results.totalBookings = bookings.length;
    results.pageCount = Math.ceil(bookings.length / limit);

    if (lastIndex < bookings.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.results = bookings.slice(startIndex, lastIndex);

    return results;
  };

  const getBookingDetailsOfUser = async (id: mongoose.Types.ObjectId) => {
    const booking = await Booking.aggregate([
      {
        $match: { _id: id },
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
    console.log(booking);
    return booking;
  };

  const getAllBookingOfHotel = async (
    hotelId: string,
    page: number,
    limit: number
  ) => {
    const hotels = await Booking.find({ hotelId: hotelId });
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    const results: any = {};
    results.totalBookings = hotels.length;
    results.pageCount = Math.ceil(hotels.length / limit);

    if (lastIndex < hotels.length) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.results = hotels.slice(startIndex, lastIndex);

    return results;
  };

  const changeStatus = async (id: string, status: string) =>
    Booking.findByIdAndUpdate(id)
      .exec()
      .then((booking: any) => {
        console.log(booking);
        booking.status = status;
        booking.save();

        return booking;
      });

  const getMonthlyRevenu = async (hotelId: mongoose.Types.ObjectId) => {
    const monthlyRevenu = await Booking.aggregate([
      {
        $match: {
          hotelId: hotelId,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    return monthlyRevenu[0];
  };

  const getYearlyRevenu = async (hotelId: mongoose.Types.ObjectId) => {
    const yearlyRevenu = await Booking.aggregate([
      {
        $match: {
          hotelId: hotelId,
        },
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    return yearlyRevenu[0];
  };

  const getTotalBookings = async (hotelId: mongoose.Types.ObjectId) => {
    const totalBookings = await Booking.aggregate([
      {
        $match: {
          hotelId: hotelId,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    return totalBookings[0];
  };

  const changePaymentStatus = async (
    id: mongoose.Types.ObjectId | string,
    paymentMethod: string
  ) => {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: { paymentMethod: paymentMethod, paymentStatus: "completerd" } },
      { new: true }
    );
    return booking;
  };

  const getWeeklyBookings = async (id: mongoose.Types.ObjectId) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weeklySales = await Booking.aggregate([
      {
        $match: { hotelId: id },
      },
      {
        $project: {
          dayOfWeek: { $dayOfWeek: "$createdAt" }, // Extract the day of the week (1-7) from the createdAt field
          totalAmount: "$price", // Use your price field as the total amount
        },
      },
      {
        $project: {
          dayOfWeek: 1, // Preserve the original dayOfWeek value
          dayName: {
            $let: {
              vars: {
                daysOfWeek: [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
              },
              in: {
                $arrayElemAt: [
                  "$$daysOfWeek",
                  { $subtract: ["$dayOfWeek", 1] },
                ], // Map day of week to day name
              },
            },
          },
          totalAmount: 1, // Preserve the totalAmount value
        },
      },
      {
        $group: {
          _id: "$dayName", // Group by the day name
          dayOrder: { $first: "$dayOfWeek" }, // Preserve the numeric day of the week for sorting
          totalBookings: { $sum: 1 }, // Count the number of bookings in each group
          totalAmount: { $sum: "$totalAmount" }, // Calculate the total amount in each group
        },
      },
      {
        $sort: { dayOrder: 1 }, // Sort by the numeric day of the week
      },
    ]);

    const resultMap = new Map();

    // Initialize the map with default values for all days of the week
    for (const day of daysOfWeek) {
      resultMap.set(day, {
        _id: day,
        dayOrder: daysOfWeek.indexOf(day),
        totalBookings: 0,
        totalAmount: 0,
      });
    }

    // Update the map with actual values from the aggregation result
    for (const entry of weeklySales) {
      resultMap.set(entry._id, entry);
    }

    // Convert the map to an array of values
    const finalResult = Array.from(resultMap.values());
    return finalResult;
  };

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
    getBookingDetailsOfUser,
    getWeeklyBookings,
  };
}

export type BookingRepositoryDbType = typeof bookingRepositoryDb;
