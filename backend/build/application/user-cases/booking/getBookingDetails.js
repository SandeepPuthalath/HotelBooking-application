"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function getBookingDetails(bookingId, respository) {
    if (!bookingId) {
        throw new appError_1.default("Bad request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const booking = await respository.getBooking(bookingId);
    return booking;
}
exports.default = getBookingDetails;
