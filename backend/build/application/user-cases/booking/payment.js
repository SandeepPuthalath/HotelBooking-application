"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function payment(bookingId, paymentMethod, paymentServices, bookingResp, roomRepo) {
    const bookingDetails = await bookingResp.changePaymentStatus(bookingId, paymentMethod);
    // console.log("booking details afte update...", bookingDetails);
    if (!bookingDetails) {
        throw new appError_1.default("There is no such booking", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const roomId = bookingDetails?.roomId;
    const roomDetails = await roomRepo.readRoom(roomId);
    if (!roomDetails) {
        throw new appError_1.default("Room cannot be found", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    console.log(roomDetails);
    switch (paymentMethod) {
        case "stripe":
            return await paymentServices.generateStripePaymentUrl(bookingId, roomDetails?.title, bookingDetails?.price * 100);
        default:
            return bookingDetails;
    }
}
exports.default = payment;
