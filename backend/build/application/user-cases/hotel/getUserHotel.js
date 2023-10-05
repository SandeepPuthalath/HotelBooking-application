"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function getUserHotel(userId, repository) {
    if (!userId) {
        throw new appError_1.default("Unauthorized", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const data = await repository.userHotel(userId);
    return data;
}
exports.default = getUserHotel;
