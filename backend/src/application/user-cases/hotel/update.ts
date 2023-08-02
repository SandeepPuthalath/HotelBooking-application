import mongoose from "mongoose";
import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";



export interface HotelUpdateType {
  name: string;
  type: string;
  address: string;
  distance: string;
  desc: string;
  cheapestPrice: number;
}


export default async function update( id: mongoose.Types.ObjectId,
  updates: HotelUpdateType,
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {
    if(!id){

        throw new AppError("Hotel dose not exist", HttpStatus.NOT_FOUND)
    }

    const { name, type, address, distance, desc, cheapestPrice } = updates
    if (
        !name ||
        !type ||
        !address ||
        !distance ||
        !desc ||
        !cheapestPrice
      ) {
        throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
      }

      const data = await hotelRepository.update(id, { name, type, address, distance, desc, cheapestPrice })

      return data
}
