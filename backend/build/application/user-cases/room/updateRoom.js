"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function updateRoom(id, updates, repository) {
    if (!id || !updates) {
        throw new appError_1.default("Please provide updated values", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const data = await repository.updateRoom(new mongoose_1.default.Types.ObjectId(id), updates);
    console.log(data);
    return data;
}
exports.default = updateRoom;
