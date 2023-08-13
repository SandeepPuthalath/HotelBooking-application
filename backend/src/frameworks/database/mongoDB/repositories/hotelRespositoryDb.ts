import mongoose from "mongoose";
import{ HotelEntityInterface } from "../../../../entities/hotel";
import Hotel from "../models/hotelModel";
import { HotelUpdateType } from "../../../../application/user-cases/hotel/update";

export default function hotelRepositoryDb() {
  const create = async (hotelEntity: HotelEntityInterface) => {
    const newHotel = new Hotel({
      name: hotelEntity.name(),
      address: hotelEntity.address(),
      destination: hotelEntity.destination(),
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

  const findByDestination = async (destination: string) => await Hotel.find({destination});



  return {
    create,
    update,
    remove,
    view,
    viewAll,
    userHotel,
    findByDestination
  };
}

export type hotelRepositoryDbInterface = typeof hotelRepositoryDb;
