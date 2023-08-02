import mongoose from "mongoose";
import { RoomInterface } from "../../entities/room";
import { RoomType, RoomsRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";


export default function roomRepository(
    repositoy: ReturnType<RoomsRepositoryDbInterface>
){

    const createRoom = async (roomEntity: RoomInterface) => await repositoy.createRoom(roomEntity);

    const readRoom = async (roomId: mongoose.Types.ObjectId) => await repositoy.readRoom(roomId);

    const readRoomByProp =async (hotelId:mongoose.Types.ObjectId) => await repositoy.readRoomByProp(hotelId);

    const updateRoom = async (roomId:mongoose.Types.ObjectId, updates: RoomType) => await repositoy.updateRoom(roomId, updates);

    const deleteRoom =async (roomId:mongoose.Types.ObjectId) => await repositoy.deleteRoom(roomId);

    const addRoomImage = async (roomId: mongoose.Types.ObjectId, imgId: string) => await repositoy.addRoomImage(roomId, imgId);

    const updateUnavailableDates =async (id: string, dates:any) => await repositoy.updateUnavailableDates(id, dates);

    const searchRooms = async (checkInDate: string, checkOutDate: string) => await repositoy.searchRooms(checkInDate, checkOutDate);

    return {
        createRoom,
        readRoom,
        updateRoom,
        deleteRoom,
        readRoomByProp,
        addRoomImage,
        updateUnavailableDates,
        searchRooms,
    }
}

export type RoomRepositoryInterface = typeof roomRepository;