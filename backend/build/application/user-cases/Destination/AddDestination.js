"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const destination_1 = __importDefault(require("../../../entities/destination"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function addDestination(name, photo, destinationResp) {
    if (!name || !photo) {
        throw new appError_1.default("Some details are missing", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const isExists = await destinationResp.isDestinationNameExists(name);
    if (isExists) {
        throw new appError_1.default("The destination already exists", httpStatus_1.HttpStatus.CONFLICT);
    }
    const newDestination = (0, destination_1.default)(name, photo);
    const data = await destinationResp.addDestination(newDestination);
    return data;
}
exports.default = addDestination;
