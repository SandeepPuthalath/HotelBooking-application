import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "hotel",
    },
    reviews: [
      {
          star: Number,
          message: String,
          postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewSchema);

export default Review