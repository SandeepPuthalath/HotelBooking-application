"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function addImage(hotelId, roomId, imgId, hotelRep, roomRep) {
    if (!hotelId || !roomId || !imgId) {
        throw new appError_1.default("Bad request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const hotel = await hotelRep.view(new mongoose_1.default.Types.ObjectId(hotelId));
    if (!hotel) {
        throw new appError_1.default("This account has not registered any hotel", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const data = await roomRep.addRoomImage(new mongoose_1.default.Types.ObjectId(roomId), imgId.toString());
    return data;
}
exports.default = addImage;
