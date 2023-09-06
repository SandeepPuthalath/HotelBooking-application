"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = __importDefault(require("../../../adapters/reviewController/reviewController"));
const reviewRepository_1 = __importDefault(require("../../../application/repositories/reviewRepository"));
const reviewRepositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/reviewRepositoryDb"));
const jwtTokenVerification_1 = __importDefault(require("../middlewares/jwtTokenVerification"));
const reviewRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, reviewController_1.default)(reviewRepository_1.default, reviewRepositoryDb_1.default);
    router
        .route("/")
        .post(jwtTokenVerification_1.default, controller.handleAddReview)
        .get(controller.handleFetchingReview);
    return router;
};
exports.default = reviewRouter;
