import mongoose from "mongoose";
import{ HotelEntityInterface } from "../../../../entities/hotel";
import Hotel from "../models/hotelModel";
import { HotelUpdateType } from "../../../../application/user-cases/hotel/update";

export default function hotelRepositoryDb() {
  const create = async (hotelEntity: HotelEntityInterface) => {
    const newHotel = new Hotel({
      name: hotelEntity.name(),
      type: hotelEntity.type(),
      address: hotelEntity.address(),
      distance: hotelEntity.distance(),
      desc: hotelEntity.desc(),
      cheapestPrice: hotelEntity.cheapestPrice(),
      userId: hotelEntity.userId(),
      photos: hotelEntity.photos()
    });
    newHotel.save();
    
    return newHotel;
  };

  const update = async (id: mongoose.Types.ObjectId, updates: HotelUpdateType ) => {

    const updatedHotel = await Hotel.findByIdAndUpdate(id, updates,{new: true});

    return updatedHotel
  }

  const remove = async (id:mongoose.Types.ObjectId) => await Hotel.deleteOne({_id:id})

  const view =async (id:mongoose.Types.ObjectId) =>  await Hotel.findById(id);

  const viewAll =async () =>  await Hotel.find();
    
  const userHotel = async (userId: mongoose.Types.ObjectId) => await Hotel.findOne({userId});


  return {
    create,
    update,
    remove,
    view,
    viewAll,
    userHotel
  };
}

export type hotelRepositoryDbInterface = typeof hotelRepositoryDb;
