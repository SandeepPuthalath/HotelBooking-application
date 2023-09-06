"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function getAllRoooms(hotelId, roomRepository, hotelRepository) {
    const hotel = await hotelRepository.view(new mongoose_1.default.Types.ObjectId(hotelId));
    if (!hotel) {
        throw new appError_1.default("Your account is not registerd with any Hotel", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const data = await roomRepository.readRoomByProp(new mongoose_1.default.Types.ObjectId(hotelId));
    return data;
}
exports.default = getAllRoooms;
