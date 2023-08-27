import mongoose from "mongoose";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { ReviewRepoDbType } from "../../../frameworks/database/mongoDB/repositories/reviewRepositoryDb";
import createReviewEntitiy from "../../../entities/review";

export default async function addCustomerReview(
  star: number,
  message: string,
  postedBy: string | mongoose.Schema.Types.ObjectId,
  id: string | mongoose.Schema.Types.ObjectId,
  repository: ReturnType<ReviewRepoDbType>
) {
  if (!id || !star || !message || !postedBy) {
    throw new AppError("BAD Reques", HttpStatus.BAD_REQUEST);
  }

  const hotelReview = await repository.getHotelReview(id);
  if (hotelReview) {
    const alreadyReviewed = hotelReview?.reviews.find(
      (item) => item?.postedBy?.toString() === postedBy.toString()
    );
    if (alreadyReviewed) {
      await repository.updateReview(star, message, alreadyReviewed);
    } else {
      await repository.addReview(star, message, postedBy, id);
    }
  } else {
    const newReview = createReviewEntitiy(id, postedBy, star, message);
    await repository.createReview(newReview);
  }
  return await repository.getReview(id);
}
