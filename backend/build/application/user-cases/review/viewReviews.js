"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function viewReviews(id, repository) {
    if (!id) {
        throw new appError_1.default("Bad request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const review = await repository.getReview(id);
    return review;
}
exports.default = viewReviews;
;
