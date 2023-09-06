"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function viewByDestination(destination, repository) {
    if (!destination) {
        throw new appError_1.default("Destination cannot be empty", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const data = await repository.findByDestination(destination);
    return data;
}
exports.default = viewByDestination;
