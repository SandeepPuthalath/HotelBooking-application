"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function update(id, updates, hotelRepository) {
    if (!id) {
        throw new appError_1.default("Hotel dose not exist", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const { name, type, address, distance, desc, cheapestPrice } = updates;
    if (!name ||
        !type ||
        !address ||
        !distance ||
        !desc ||
        !cheapestPrice) {
        throw new appError_1.default("Please fill all the fields", httpStatus_1.HttpStatus.NOT_ACCEPTABLE);
    }
    const data = await hotelRepository.update(id, { name, type, address, distance, desc, cheapestPrice });
    return data;
}
exports.default = update;
