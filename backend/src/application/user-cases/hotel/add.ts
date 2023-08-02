import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import createHotelEntity from "../../../entities/hotel";

export interface HotelType {
  name: string;
  type: string;
  address: string;
  distance: string;
  desc: string;
  cheapestPrice: number;
  userId: string
}

export default async function createHotel(
  userId: string,
  hotel: {
    name: string;
    type: string;
    address: string;
    distance: string;
    desc: string;
    cheapestPrice: number;
    userId: string,
    photos: string
  },
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {
  const { name, type, address, distance, desc, cheapestPrice, photos} = hotel;

  if(!userId) return new AppError("Unauthorized", HttpStatus.UNAUTHORIZED)

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

  const newHotel = createHotelEntity(
    name,
    type,
    address,
    distance,
    desc,
    cheapestPrice,
    userId,
    photos
  );

  const data = await hotelRepository.create(newHotel);

  return data;
}
