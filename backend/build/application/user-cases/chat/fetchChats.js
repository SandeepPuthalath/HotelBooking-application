"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function fetchChats(hotelId, repository) {
    if (!hotelId) {
        throw new appError_1.default("Something went wrong", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const messages = await repository.getMessages(new mongoose_1.default.Types.ObjectId(hotelId));
    return messages ? messages : [];
}
exports.default = fetchChats;
