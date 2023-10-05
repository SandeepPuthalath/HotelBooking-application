"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function getHotelPerformance(hotelId, repository) {
    if (!hotelId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const monthlyRevenu = await repository.getMonthlyRevenu(new mongoose_1.default.Types.ObjectId(hotelId));
    const yearlyRevenu = await repository.getYearlyRevenu(new mongoose_1.default.Types.ObjectId(hotelId));
    const totalBookings = await repository.getTotalBookings(new mongoose_1.default.Types.ObjectId(hotelId));
    return {
        monthlyRevenu,
        yearlyRevenu,
        totalBookings,
    };
}
exports.default = getHotelPerformance;
