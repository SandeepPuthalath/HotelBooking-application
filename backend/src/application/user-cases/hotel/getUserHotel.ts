import mongoose from "mongoose";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";



export default async function getUserHotel(userId: mongoose.Types.ObjectId, repository: ReturnType<hotelRepositoryDbInterface>){

    if(!userId){
        throw new AppError("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    const data = await repository.userHotel(userId)
    
    return data

}