"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const hotel_1 = __importDefault(require("../../../entities/hotel"));
async function createHotel(userId, hotel, hotelRepository) {
    const { name, address, destination, distance, desc, cheapestPrice, photos } = hotel;
    if (!userId)
        return new appError_1.default("Unauthorized", httpStatus_1.HttpStatus.UNAUTHORIZED);
    if (!name ||
        !address ||
        !destination ||
        !distance ||
        !desc ||
        !cheapestPrice ||
        !photos) {
        throw new appError_1.default("Please fill all the fields", httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    const newHotel = (0, hotel_1.default)(name, address, destination, distance, desc, cheapestPrice, userId, photos);
    const data = await hotelRepository.create(newHotel);
    return data;
}
exports.default = createHotel;
