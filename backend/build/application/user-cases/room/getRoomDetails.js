"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function getRoomDetails(hotelId, roomId, hotelRep, roomRep) {
    if (!hotelId || !roomId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const hotel = await hotelRep.view(new mongoose_1.default.Types.ObjectId(hotelId));
    if (!hotel) {
        throw new appError_1.default("There is no registered hotel", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const data = roomRep.readRoom(new mongoose_1.default.Types.ObjectId(roomId));
    return data;
}
exports.default = getRoomDetails;
