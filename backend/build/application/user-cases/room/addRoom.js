"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const room_1 = __importDefault(require("../../../entities/room"));
const mongoose_1 = __importDefault(require("mongoose"));
async function addRoom(hotelId, room, roomRepository, hotelRepository) {
    const hotel = await hotelRepository.view(new mongoose_1.default.Types.ObjectId(hotelId));
    if (!hotel) {
        throw new appError_1.default("Your account is not registerd with any Hotel", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const { title, price, maxPeople, desc, photos } = room;
    if (!title || !price || !maxPeople || !desc) {
        throw new appError_1.default("Please fill all the fields", httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    const newRoom = (0, room_1.default)(hotelId, title, price, maxPeople, desc, photos);
    const data = await roomRepository.createRoom(newRoom);
    await hotel.save();
    return data;
}
exports.default = addRoom;
