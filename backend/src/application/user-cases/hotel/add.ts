import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import createHotelEntity from "../../../entities/hotel";

export interface HotelType {
  name: string;
  address: string;
  destination: string,
  distance: string;
  desc: string;
  cheapestPrice: number;
  photo: string,
}

export default async function createHotel(
  userId: string,
  hotel: {
    name: string;
    address: string;
    destination: string;
    distance: string;
    desc: string;
    cheapestPrice: number;
    photos: string
  },
  hotelRepository: ReturnType<hotelRepositoryDbInterface>
) {
  const { name, address, destination, distance, desc, cheapestPrice, photos} = hotel;

  if(!userId) return new AppError("Unauthorized", HttpStatus.UNAUTHORIZED)

  if (
    !name ||
    !address ||
    !destination||
    !distance ||
    !desc ||
    !cheapestPrice||
    !photos 
  ) {
    throw new AppError("Please fill all the fields", HttpStatus.NOT_ACCEPTABLE);
  }

  const newHotel = createHotelEntity(
    name,
    address,
    destination,
    distance,
    desc,
    cheapestPrice,
    userId,
    photos
  );

  const data = await hotelRepository.create(newHotel);

  return data;
}
