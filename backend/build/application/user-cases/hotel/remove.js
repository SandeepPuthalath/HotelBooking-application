"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function remove(id, hotelRepository) {
    if (!id) {
        throw new appError_1.default("Hotel dose not exist", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    await hotelRepository.remove(id);
    return true;
}
exports.default = remove;
