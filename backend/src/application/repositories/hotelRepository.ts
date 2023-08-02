import mongoose from "mongoose";
import { HotelEntityInterface } from "../../entities/hotel";
import { hotelRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HotelUpdateType } from "../user-cases/hotel/update";

export default function hotelRepository(
  repository: ReturnType<hotelRepositoryDbInterface>
) {
  const create = async (hotelEntity: HotelEntityInterface) =>
    await repository.create(hotelEntity);

  const update =async (id:mongoose.Types.ObjectId, updates: HotelUpdateType) => await repository.update(id, updates);

  const remove = async (id:mongoose.Types.ObjectId) => await repository.remove(id);

  const view =async (id:mongoose.Types.ObjectId) =>  await repository.view(id);

  const viewAll =async () => await repository.viewAll();

  const userHotel =async (userId:mongoose.Types.ObjectId) => await repository.userHotel(userId)


  return {
    create,
    update,
    remove,
    view,
    viewAll,
    userHotel,
  };
}

export type hotelRepositoryInterface = typeof hotelRepository;
