"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addCustomerReview_1 = __importDefault(require("../../application/user-cases/review/addCustomerReview"));
const httpStatus_1 = require("../../types/httpStatus");
const viewReviews_1 = __importDefault(require("../../application/user-cases/review/viewReviews"));
function reviewController(reviewRepoInt, reviewRepoImp) {
    const repositroy = reviewRepoInt(reviewRepoImp());
    const handleAddReview = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { id, postedBy, star, message } = req.body;
        const result = await (0, addCustomerReview_1.default)(star, message, postedBy, id, repositroy);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "Review Added successfully",
            result,
        });
    });
    const handleFetchingReview = (0, express_async_handler_1.default)(async (req, res, next) => {
        const id = req.query.hotelId;
        const result = await (0, viewReviews_1.default)(id, repositroy);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "Review has been fetch successfully",
            result,
        });
    });
    return {
        handleAddReview,
        handleFetchingReview,
    };
}
exports.default = reviewController;
