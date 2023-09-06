"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function fetchAllBookingsOfHotel(hotelId, page, limit, repository) {
    if (!hotelId) {
        throw new appError_1.default("Bad request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const bookings = await repository.getAllBookingOfHotel(hotelId, page, limit);
    return bookings;
}
exports.default = fetchAllBookingsOfHotel;
