"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function fetchUserBooking(id, repository) {
    if (!id) {
        throw new appError_1.default("The booking dose not exists", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const booking = await repository.getBookingDetailsOfUser(new mongoose_1.default.Types.ObjectId(id));
    return booking;
}
exports.default = fetchUserBooking;
