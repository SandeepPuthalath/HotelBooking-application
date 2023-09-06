"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateArray = void 0;
const booking_1 = __importDefault(require("../../../entities/booking"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const mongoose_1 = __importDefault(require("mongoose"));
const createDateArray = (startDate, endDate) => {
    const currentDate = new Date(startDate);
    const datesArray = [];
    while (currentDate <= new Date(endDate)) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return datesArray;
};
exports.createDateArray = createDateArray;
async function booking(bookingDetails, bookingRepo, roomRepo) {
    const { name, phoneNumber, email, address, roomId, hotelId, userId, maxPeople, checkInDate, checkOutDate, price } = bookingDetails;
    const dates = (0, exports.createDateArray)(checkInDate, checkOutDate);
    if (!name ||
        !phoneNumber ||
        !email ||
        !address ||
        !roomId ||
        !hotelId ||
        !userId ||
        !maxPeople ||
        !checkInDate ||
        !checkOutDate ||
        !price) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    //creating booking entities
    const bookingEntity = (0, booking_1.default)(name, phoneNumber, email, address, new mongoose_1.default.Types.ObjectId(roomId), new mongoose_1.default.Types.ObjectId(hotelId), new mongoose_1.default.Types.ObjectId(userId), maxPeople, checkInDate, checkOutDate, dates.length, price);
    const data = await bookingRepo.createBooking(bookingEntity);
    await roomRepo.updateUnavailableDates(roomId, dates);
    return data;
}
exports.default = booking;
