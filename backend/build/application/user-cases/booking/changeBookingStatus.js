"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function changeBookingStatus(bookingId, status, respository) {
    console.log("in booking change status use case", bookingId, status);
    if (!bookingId || !status) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await respository.changeStatus(bookingId, status);
}
exports.default = changeBookingStatus;
