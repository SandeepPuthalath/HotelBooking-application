"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const httpStatus_1 = require("../../types/httpStatus");
const createBooking_1 = __importDefault(require("../../application/user-cases/booking/createBooking"));
const getAllUserBookings_1 = __importDefault(require("../../application/user-cases/booking/getAllUserBookings"));
const cancelBooking_1 = __importDefault(require("../../application/user-cases/booking/cancelBooking"));
const fetchAllBookingsOfHotel_1 = __importDefault(require("../../application/user-cases/booking/fetchAllBookingsOfHotel"));
const getBookingDetails_1 = __importDefault(require("../../application/user-cases/booking/getBookingDetails"));
const changeBookingStatus_1 = __importDefault(require("../../application/user-cases/booking/changeBookingStatus"));
const getHotelPerformance_1 = __importDefault(require("../../application/user-cases/booking/getHotelPerformance"));
const payment_1 = __importDefault(require("../../application/user-cases/booking/payment"));
const fetchUserBooking_1 = __importDefault(require("../../application/user-cases/booking/fetchUserBooking"));
const getChartsData_1 = __importDefault(require("../../application/user-cases/booking/getChartsData"));
const addMoney_1 = __importDefault(require("../../application/user-cases/wallet/addMoney"));
function bookingController(bookingRepoInt, bookingRepoDbImp, roomRepoInt, roomRepoImp, paymentInt, paymetnImp, walletInt, walletImp, transactionInt, transactionImp) {
    const bookingRepo = bookingRepoInt(bookingRepoDbImp());
    const roomRepo = roomRepoInt(roomRepoImp());
    const payments = paymentInt(paymetnImp());
    const walletRepo = walletInt(walletImp());
    const transRepo = transactionInt(transactionImp());
    const handleBooking = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bookingDetails = req.body;
        const data = await (0, createBooking_1.default)(bookingDetails, bookingRepo, roomRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Hotel room has been booked successfully",
            booking: data,
        });
    });
    const handlePayment = (0, express_async_handler_1.default)(async (req, res, next) => {
        console.log("in payment section");
        const { paymentMethod } = req.body;
        const id = req.query.id;
        console.log(id, paymentMethod);
        const data = await (0, payment_1.default)(id, paymentMethod, payments, bookingRepo, roomRepo);
        console.log(data);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "payment has been successfull",
            url: data?.url,
        });
    });
    const handleGetAllBookingsOfUser = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { userId } = req.params;
        const page = parseInt(req.query?.page);
        const limit = parseInt(req.query?.limit);
        const data = await (0, getAllUserBookings_1.default)(userId, page, limit, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            messaage: "All Bookings has been fetched",
            data: data,
        });
    });
    const handleCancelBooking = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { bookingId } = req.params;
        const userId = req.query?.userId;
        const data = await (0, cancelBooking_1.default)(bookingId, bookingRepo);
        if (userId) {
            const result = await (0, addMoney_1.default)(userId, data?.price, walletRepo, transRepo);
        }
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            messaage: `${bookingId?.substring(0, 10)} has been cancelled`,
        });
    });
    const handleGettingAllBookingOfHotel = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { hotelId } = req.params;
        const page = parseInt(req.query?.page);
        const limit = parseInt(req.query?.limit);
        console.log("pagination parameters", page, limit);
        const bookings = await (0, fetchAllBookingsOfHotel_1.default)(hotelId, page, limit, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            messaage: "All bookings has been fetched",
            bookings: bookings,
        });
    });
    const handleFetchingBookingDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bookingId = req.query["bookingId"]?.toString();
        const booking = await (0, getBookingDetails_1.default)(bookingId, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Booking details has been fetched successfully",
            booking,
        });
    });
    const handleStatsuChange = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bookingId = req.query?.bookingId?.toString();
        const status = req.query?.status?.toString();
        await (0, changeBookingStatus_1.default)(bookingId, status, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Successfully updated booking status",
        });
    });
    const handleFetchingHotelPerformance = (0, express_async_handler_1.default)(async (req, res, next) => {
        const hotelId = req.query?.hotelId?.toString();
        const { monthlyRevenu, yearlyRevenu, totalBookings } = await (0, getHotelPerformance_1.default)(hotelId, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "successfully fetched performance",
            monthlyRevenu,
            yearlyRevenu,
            totalBookings,
        });
    });
    const handleGetBookingDetailsOfUser = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { id } = req.params;
        const bookingDetails = await (0, fetchUserBooking_1.default)(id, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Successfully fetched data",
            bookingDetails: bookingDetails[0],
        });
    });
    const handleFetchingChartsDatas = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { hotelId } = req.params;
        console.log("charts", hotelId);
        const data = await (0, getChartsData_1.default)(hotelId, bookingRepo);
        res.status(httpStatus_1.HttpStatus.OK).json({ status: "success", message: "successfully fetched data", ...data });
    });
    return {
        handleBooking,
        handleGetAllBookingsOfUser,
        handleCancelBooking,
        handleGettingAllBookingOfHotel,
        handleFetchingBookingDetails,
        handleStatsuChange,
        handleFetchingHotelPerformance,
        handlePayment,
        handleGetBookingDetailsOfUser,
        handleFetchingChartsDatas,
    };
}
exports.default = bookingController;
