"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function searchRoom(search, roomRep) {
    const { checkInDate, checkOutDate } = search;
    if (!checkInDate || !checkOutDate) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const data = await roomRep.searchRooms(checkInDate, checkOutDate);
    return data;
}
exports.default = searchRoom;
