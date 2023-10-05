"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
async function ratingHotel(star, userId, hotelId, repository) {
    if (!star || !userId || !hotelId) {
        throw new appError_1.default("Please choose a rating", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const hotel = await repository.view(new mongoose_1.default.Types.ObjectId(hotelId));
    const alreadyRated = hotel?.ratings.find((rating) => rating.postedby?.toString() === userId.toString());
    try {
        if (alreadyRated) {
            const updatedRating = await repository.updateRating(star, alreadyRated);
        }
        else {
            const rateHotel = await repository.rateHotel(star, hotelId, userId);
        }
        const getAllRating = await repository.view(new mongoose_1.default.Types.ObjectId(hotelId));
        const totalRating = getAllRating?.ratings.length;
        const ratingSum = getAllRating?.ratings
            .map((rating) => rating.star)
            .reduce((acc, curr) => acc + curr, 0);
        const actualRating = Math.round(ratingSum / totalRating);
        const hotel = await repository.updateTotalRating(actualRating, hotelId);
        return hotel;
    }
    catch (error) {
        throw new appError_1.default("somthing went wrong", httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.default = ratingHotel;
