import mongoose from "mongoose";
import { HotelEntityInterface } from "../../entities/hotel";
import { hotelRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HotelUpdateType } from "../user-cases/hotel/update";

export default function hotelRepository(
  repository: ReturnType<hotelRepositoryDbInterface>
) {
  const create = async (hotelEntity: HotelEntityInterface) =>
    await repository.create(hotelEntity);

  const update = async (
    id: mongoose.Types.ObjectId,
    updates: HotelUpdateType
  ) => await repository.update(id, updates);

  const remove = async (id: mongoose.Types.ObjectId) =>
    await repository.remove(id);

  const view = async (id: mongoose.Types.ObjectId) => await repository.view(id);

  const viewAll = async () => await repository.viewAll();

  const userHotel = async (userId: mongoose.Types.ObjectId) =>
    await repository.userHotel(userId);

  const findByDestination = async (destination: string) =>
    await repository.findByDestination(destination);

  const rateHotel = async (
    star: number,
    hotelId: string | mongoose.Types.ObjectId,
    userId: string | mongoose.Types.ObjectId
  ) => await repository.rateHotel(star, hotelId, userId);

  const updateRating = async (star: number, alreadyRated: any) =>
    await repository.updateRating(star, alreadyRated);

  const updateTotalRating = async (
    totalRating: number,
    hotelId: string | mongoose.Types.ObjectId
  ) => await repository.updateTotalRating(totalRating, hotelId);

  const countHotels = async () => await repository.countHotels()

  const featuredHotels = async () => await repository.featuredHotels();

  return {
    create,
    update,
    remove,
    view,
    viewAll,
    userHotel,
    findByDestination,
    rateHotel,
    updateRating,
    updateTotalRating,
    countHotels,
    featuredHotels,
  };
}

export type hotelRepositoryInterface = typeof hotelRepository;
