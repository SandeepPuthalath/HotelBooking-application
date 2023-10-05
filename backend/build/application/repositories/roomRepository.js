"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function roomRepository(repositoy) {
    const createRoom = async (roomEntity) => await repositoy.createRoom(roomEntity);
    const readRoom = async (roomId) => await repositoy.readRoom(roomId);
    const readRoomByProp = async (hotelId) => await repositoy.readRoomByProp(hotelId);
    const updateRoom = async (roomId, updates) => await repositoy.updateRoom(roomId, updates);
    const deleteRoom = async (roomId) => await repositoy.deleteRoom(roomId);
    const addRoomImage = async (roomId, imgId) => await repositoy.addRoomImage(roomId, imgId);
    const updateUnavailableDates = async (id, dates) => await repositoy.updateUnavailableDates(id, dates);
    const searchRooms = async (checkInDate, checkOutDate) => await repositoy.searchRooms(checkInDate, checkOutDate);
    return {
        createRoom,
        readRoom,
        updateRoom,
        deleteRoom,
        readRoomByProp,
        addRoomImage,
        updateUnavailableDates,
        searchRooms,
    };
}
exports.default = roomRepository;
