import express from "express";
import reviewController from "../../../adapters/reviewController/reviewController";
import reviewRepository from "../../../application/repositories/reviewRepository";
import reviewRespositoryDb from "../../database/mongoDB/repositories/reviewRepositoryDb";
import jwtTokenVerification from "../middlewares/jwtTokenVerification";

const reviewRouter = () => {
  const router = express.Router();
  const controller = reviewController(reviewRepository, reviewRespositoryDb);

  router
    .route("/")
    .post(jwtTokenVerification, controller.handleAddReview)
    .get(controller.handleFetchingReview);

  return router;
};

export default reviewRouter;
