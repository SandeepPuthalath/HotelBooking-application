import expressAsyncHandler from "express-async-handler";
import { ReviewRepoType } from "../../application/repositories/reviewRepository";
import { ReviewRepoDbType } from "../../frameworks/database/mongoDB/repositories/reviewRepositoryDb";
import { NextFunction, Request, Response } from "express";
import addCustomerReview from "../../application/user-cases/review/addCustomerReview";
import { HttpStatus } from "../../types/httpStatus";
import viewReviews from "../../application/user-cases/review/viewReviews";

export default function reviewController(
  reviewRepoInt: ReviewRepoType,
  reviewRepoImp: ReviewRepoDbType
) {
  const repositroy = reviewRepoInt(reviewRepoImp());

  const handleAddReview = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id, postedBy, star, message } = req.body;

      const result = await addCustomerReview(
        star,
        message,
        postedBy,
        id,
        repositroy
      );

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "Review Added successfully",
          result,
        });
    }
  );

  const handleFetchingReview = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.query.hotelId as string;
      const result = await viewReviews(id, repositroy);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "Review has been fetch successfully",
          result,
        });
    }
  );

  return {
    handleAddReview,
    handleFetchingReview,
  };
}
