import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import AppError from "../../../utils/appError";
import { HttpStatus } from "../../../types/httpStatus";



export default async function view(id: mongoose.Types.ObjectId, repository: ReturnType<hotelRepositoryDbInterface>){

    if(!id){
        throw new AppError('Hotel dose not exists', HttpStatus.NOT_FOUND)
    }


    const data = await repository.view(id)

    return data

}


