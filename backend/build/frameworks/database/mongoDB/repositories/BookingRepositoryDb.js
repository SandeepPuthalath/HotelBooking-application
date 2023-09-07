"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
function bookingRepositoryDb() {
    const createBooking = async (bookingEntity) => {
        const newBooking = new bookingModel_1.default({
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
        const bookings = await bookingModel_1.default.find();
        return bookings;
    };
    const getBooking = async (id) => await bookingModel_1.default.findById(id);
    const deleteBooking = async (id) => await bookingModel_1.default.findByIdAndUpdate(id, { $set: { status: "cancelled" } }, { new: true });
    const updateBooking = async (id, updates) => await bookingModel_1.default.updateOne({ _id: id }, {
        $set: updates,
    });
    const getAllBookingsOfUser = async (userId, page, limit) => {
        const bookings = await bookingModel_1.default.find({ userId });
        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;
        const results = {};
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
    const getBookingDetailsOfUser = async (id) => {
        const booking = await bookingModel_1.default.aggregate([
            {
                $match: { _id: id },
            },
            {
                $lookup: {
                    from: "hotels",
                    localField: "hotelId",
                    foreignField: "_id",
                    as: "hotelInfo",
                },
            },
            {
                $lookup: {
                    from: "rooms",
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
    const getAllBookingOfHotel = async (hotelId, page, limit) => {
        const hotels = await bookingModel_1.default.find({ hotelId: hotelId });
        const startIndex = (page - 1) * limit;
        const lastIndex = page * limit;
        const results = {};
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
    const changeStatus = async (id, status) => bookingModel_1.default.findByIdAndUpdate(id)
        .exec()
        .then((booking) => {
        console.log(booking);
        booking.status = status;
        booking.save();
        return booking;
    });
    const getMonthlyRevenu = async (hotelId) => {
        const monthlyRevenu = await bookingModel_1.default.aggregate([
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
    const getYearlyRevenu = async (hotelId) => {
        const yearlyRevenu = await bookingModel_1.default.aggregate([
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
    const getTotalBookings = async (hotelId) => {
        const totalBookings = await bookingModel_1.default.aggregate([
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
    const changePaymentStatus = async (id, paymentMethod) => {
        const booking = await bookingModel_1.default.findByIdAndUpdate(id, { $set: { paymentMethod: paymentMethod, paymentStatus: "completerd" } }, { new: true });
        return booking;
    };
    const getWeeklyBookings = async (id) => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const weeklySales = await bookingModel_1.default.aggregate([
            {
                $match: { hotelId: id },
            },
            {
                $project: {
                    dayOfWeek: { $dayOfWeek: "$createdAt" },
                    totalAmount: "$price", // Use your price field as the total amount
                },
            },
            {
                $project: {
                    dayOfWeek: 1,
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
                    _id: "$dayName",
                    dayOrder: { $first: "$dayOfWeek" },
                    totalBookings: { $sum: 1 },
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
    const countBookings = async () => bookingModel_1.default.countDocuments();
    const adminRevenu = async () => {
        const overollAmount = await bookingModel_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$price" },
                },
            },
        ]);
        return Math.round(overollAmount[0]?.total * 0.10);
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
        countBookings,
        adminRevenu,
    };
}
exports.default = bookingRepositoryDb;
