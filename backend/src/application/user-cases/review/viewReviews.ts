import mongoose from "mongoose";
import { ReviewRepoDbType } from "../../../frameworks/database/mongoDB/repositories/reviewRepositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";


export default async function viewReviews(
  id: string | mongoose.Schema.Types.ObjectId,
  repository: ReturnType<ReviewRepoDbType>
){
    if(!id){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    const review = await repository.getReview(id);

    return review;

};