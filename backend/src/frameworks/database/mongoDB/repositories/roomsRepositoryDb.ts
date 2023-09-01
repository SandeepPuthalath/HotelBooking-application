import { createDateArray } from "../../../../application/user-cases/booking/createBooking";
import { RoomInterface } from "../../../../entities/room";
import Room from "../models/roomModel";
import mongoose from "mongoose";

export interface RoomType {
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  photos: string;
}

export default function roomsRepositoryDb() {
  const createRoom = async (roomEntity: RoomInterface) => {
    const newRoom = new Room({
      hoteId: roomEntity.getHotelId(),
      title: roomEntity.getTitile(),
      price: roomEntity.getPrice(),
      maxPeople: roomEntity.getMaxPeople(),
      desc: roomEntity.getDesc(),
    });

    const photos = roomEntity.getPhotos();
    if (photos) {
      newRoom.photos.push(photos);
    }

    await newRoom.save();
    return newRoom;
  };

  const readRoom = async (roomId: mongoose.Types.ObjectId) => {
    return await Room.findById(roomId);
  };

  const readRoomByProp = async (hotelId: mongoose.Types.ObjectId) =>
    await Room.find({ hoteId: hotelId });

  const updateRoom = async (
    roomId: mongoose.Types.ObjectId,
    updates: RoomType
  ) => {
    return await Room.findByIdAndUpdate(
      roomId,
      { $set: { ...updates } },
      { new: true }
    );
  };

  const deleteRoom = async (roomId: mongoose.Types.ObjectId) => {
    return await Room.findByIdAndDelete(roomId);
  };

  const addRoomImage = async (
    roomId: mongoose.Types.ObjectId,
    imgId: string
  ) => {
    const room = await Room.findById(roomId);
    room?.photos.push(imgId);
    room?.save();
    return room;
  };

  const updateUnavailableDates = async (id: string, dates: any) =>
    await Room.updateOne(
      { _id: id },
      { $addToSet: { unavailbleDates: { $each: dates } } }
    );
  
  
  const searchRooms = async (checkInDate: string, checkOutDate: string) =>{
       const datesArray = createDateArray(checkInDate, checkOutDate);
       const data = await Room.find({unavailbleDates:{$not:{$elemMatch: {$in: datesArray}}}})

       return data
  }

  return {
    createRoom,
    updateRoom,
    readRoom,
    deleteRoom,
    readRoomByProp,
    addRoomImage,
    updateUnavailableDates,
    searchRooms,
  };
}

export type RoomsRepositoryDbInterface = typeof roomsRepositoryDb;
