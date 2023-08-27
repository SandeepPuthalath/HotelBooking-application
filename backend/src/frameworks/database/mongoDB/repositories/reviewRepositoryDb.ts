import mongoose from "mongoose";
import { ReviewEntityType } from "../../../../entities/review";
import Review from "../models/ReviewModel";

export default function reviewRespositoryDb() {
  const getHotelReview = async (id: string | mongoose.Schema.Types.ObjectId) =>
    await Review.findOne({ hotelId: id });

  const createReview = async (reviewEntity: ReviewEntityType) => {
    const review = new Review({
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

  const getReview = async (id: string | mongoose.Schema.Types.ObjectId) => {
    const review = await Review.findOne({ hotelId: id }).populate(
      "reviews.postedBy", "_id firstName lastName"
    );
    return review
  };
  const addReview = async (
    star: number,
    message: string,
    postedBy: string | mongoose.Schema.Types.ObjectId,
    id: string | mongoose.Schema.Types.ObjectId
  ) =>
    await Review.findOneAndUpdate(
      { hotelId: id },
      {
        $push: {
          reviews: { star: star, message: message, postedBy: postedBy },
        },
      },
      {
        new: true,
      }
    );

  const updateReview = async (
    star: number,
    message: string,
    alreadyReviewed: any
  ) =>
    await Review.updateOne(
      {
        reviews: { $elemMatch: alreadyReviewed },
      },
      {
        $set: { "reviews.$.star": star, "reviews.$.message": message },
      },
      {
        new: true,
      }
    );

  return {
    createReview,
    addReview,
    getHotelReview,
    updateReview,
    getReview,
  };
}

export type ReviewRepoDbType = typeof reviewRespositoryDb;
