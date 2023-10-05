"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createBooking_1 = require("../../../../application/user-cases/booking/createBooking");
const roomModel_1 = __importDefault(require("../models/roomModel"));
function roomsRepositoryDb() {
    const createRoom = async (roomEntity) => {
        const newRoom = new roomModel_1.default({
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
    const readRoom = async (roomId) => {
        return await roomModel_1.default.findById(roomId);
    };
    const readRoomByProp = async (hotelId) => await roomModel_1.default.find({ hoteId: hotelId });
    const updateRoom = async (roomId, updates) => {
        return await roomModel_1.default.findByIdAndUpdate(roomId, { $set: { ...updates } }, { new: true });
    };
    const deleteRoom = async (roomId) => {
        return await roomModel_1.default.findByIdAndDelete(roomId);
    };
    const addRoomImage = async (roomId, imgId) => {
        const room = await roomModel_1.default.findById(roomId);
        room?.photos.push(imgId);
        room?.save();
        return room;
    };
    const updateUnavailableDates = async (id, dates) => await roomModel_1.default.updateOne({ _id: id }, { $addToSet: { unavailbleDates: { $each: dates } } });
    const searchRooms = async (checkInDate, checkOutDate) => {
        const datesArray = (0, createBooking_1.createDateArray)(checkInDate, checkOutDate);
        const data = await roomModel_1.default.find({ unavailbleDates: { $not: { $elemMatch: { $in: datesArray } } } });
        return data;
    };
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
exports.default = roomsRepositoryDb;
