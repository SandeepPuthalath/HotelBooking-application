"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const review_1 = __importDefault(require("../../../entities/review"));
async function addCustomerReview(star, message, postedBy, id, repository) {
    if (!id || !star || !message || !postedBy) {
        throw new appError_1.default("BAD Reques", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const hotelReview = await repository.getHotelReview(id);
    if (hotelReview) {
        const alreadyReviewed = hotelReview?.reviews.find((item) => item?.postedBy?.toString() === postedBy.toString());
        if (alreadyReviewed) {
            await repository.updateReview(star, message, alreadyReviewed);
        }
        else {
            await repository.addReview(star, message, postedBy, id);
        }
    }
    else {
        const newReview = (0, review_1.default)(id, postedBy, star, message);
        await repository.createReview(newReview);
    }
    return await repository.getReview(id);
}
exports.default = addCustomerReview;
