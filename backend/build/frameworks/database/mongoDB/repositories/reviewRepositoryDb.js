"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
function reviewRespositoryDb() {
    const getHotelReview = async (id) => await ReviewModel_1.default.findOne({ hotelId: id });
    const createReview = async (reviewEntity) => {
        const review = new ReviewModel_1.default({
            hotelId: reviewEntity.getHotelId(),
            reviews: [
                {
                    star: reviewEntity.getStar(),
                    message: reviewEntity.getMessage(),
                    postedBy: reviewEntity.getUserId(),
                },
            ],
        });
        await review.save();
        return review;
    };
    const getReview = async (id) => {
        const review = await ReviewModel_1.default.findOne({ hotelId: id }).populate("reviews.postedBy", "_id firstName lastName");
        return review;
    };
    const addReview = async (star, message, postedBy, id) => await ReviewModel_1.default.findOneAndUpdate({ hotelId: id }, {
        $push: {
            reviews: { star: star, message: message, postedBy: postedBy },
        },
    }, {
        new: true,
    });
    const updateReview = async (star, message, alreadyReviewed) => await ReviewModel_1.default.updateOne({
        reviews: { $elemMatch: alreadyReviewed },
    }, {
        $set: { "reviews.$.star": star, "reviews.$.message": message },
    }, {
        new: true,
    });
    return {
        createReview,
        addReview,
        getHotelReview,
        updateReview,
        getReview,
    };
}
exports.default = reviewRespositoryDb;
