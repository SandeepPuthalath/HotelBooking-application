"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function view(id, repository) {
    if (!id) {
        throw new appError_1.default('Hotel dose not exists', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const data = await repository.view(id);
    return data;
}
exports.default = view;
