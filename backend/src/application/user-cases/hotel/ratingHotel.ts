import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";

export default async function ratingHotel(
  star: number,
  userId: string | mongoose.Types.ObjectId,
  hotelId: string | mongoose.Types.ObjectId,
  repository: ReturnType<hotelRepositoryDbInterface>
) {
  if (!star || !userId || !hotelId) {
    throw new AppError("Please choose a rating", HttpStatus.NOT_FOUND);
  }

  const hotel = await repository.view(new mongoose.Types.ObjectId(hotelId));
  const alreadyRated = hotel?.ratings.find(
    (rating) => rating.postedby?.toString() === userId.toString()
  );
  try {
    if (alreadyRated) {
      const updatedRating = await repository.updateRating(star, alreadyRated);
    } else {
      const rateHotel = await repository.rateHotel(star, hotelId, userId);
    }
    const getAllRating: any = await repository.view(
      new mongoose.Types.ObjectId(hotelId)
    );
    const totalRating: number = getAllRating?.ratings.length;
    const ratingSum: number = getAllRating?.ratings
      .map((rating: any) => rating.star)
      .reduce((acc: number, curr: number) => acc + curr, 0);
    const actualRating: number = Math.round(ratingSum / totalRating);
    const hotel = await repository.updateTotalRating(actualRating, hotelId);
    return hotel;
  } catch (error) {
    throw new AppError("somthing went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
