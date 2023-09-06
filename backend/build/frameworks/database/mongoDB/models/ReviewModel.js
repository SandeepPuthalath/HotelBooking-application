"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    hotelId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        trim: true,
        ref: "hotel",
    },
    reviews: [
        {
            star: Number,
            message: String,
            postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
        },
    ],
}, {
    timestamps: true,
});
const Review = mongoose_1.default.model("review", reviewSchema);
exports.default = Review;
