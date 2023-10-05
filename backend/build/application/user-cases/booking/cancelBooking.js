"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function cancdelBooking(bookingId, repository) {
    if (!bookingId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await repository.deleteBooking(bookingId);
}
exports.default = cancdelBooking;
