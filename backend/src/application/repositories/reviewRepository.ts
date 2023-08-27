import mongoose from "mongoose";
import { ReviewEntityType } from "../../entities/review";
import { ReviewRepoDbType } from "../../frameworks/database/mongoDB/repositories/reviewRepositoryDb";

export default function reviewRepository(
  repository: ReturnType<ReviewRepoDbType>
) {
  const getHotelReview = async (id: string | mongoose.Schema.Types.ObjectId) =>
    await repository.getHotelReview(id);

  const getReview = async (id:string | mongoose.Schema.Types.ObjectId) => await repository.getReview(id);

  const createReview = async (reviewEntity: ReviewEntityType) =>
    await repository.createReview(reviewEntity);

  const addReview = async (
    star: number,
    message: string,
    postedBy: string | mongoose.Schema.Types.ObjectId,
    id: string | mongoose.Schema.Types.ObjectId
  ) => await repository.addReview(star, message, postedBy, id);

  const updateReview = async (
    star: number,
    message: string,
    alreadyReviewed: any
  ) => repository.updateReview(star, message, alreadyReviewed);

  return {
    createReview,
    addReview,
    getHotelReview,
    updateReview,
    getReview,
  };
}

export type ReviewRepoType = typeof reviewRepository;
