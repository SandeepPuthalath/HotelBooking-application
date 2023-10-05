"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function getChartsData(hotelId, repository) {
    if (!hotelId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const weekly = await repository.getWeeklyBookings(new mongoose_1.default.Types.ObjectId(hotelId));
    return {
        weekly,
    };
}
exports.default = getChartsData;
