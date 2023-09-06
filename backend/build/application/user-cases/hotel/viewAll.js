"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function viewAll(repository) {
    const data = await repository.viewAll();
    if (!data) {
        throw new appError_1.default('There is no data found', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return data;
}
exports.default = viewAll;
