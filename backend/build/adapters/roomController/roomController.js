"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addRoom_1 = __importDefault(require("../../application/user-cases/room/addRoom"));
const httpStatus_1 = require("../../types/httpStatus");
const getAllRooms_1 = __importDefault(require("../../application/user-cases/room/getAllRooms"));
const getRoomDetails_1 = __importDefault(require("../../application/user-cases/room/getRoomDetails"));
const addImage_1 = __importDefault(require("../../application/user-cases/room/addImage"));
const searchRoom_1 = __importDefault(require("../../application/user-cases/room/searchRoom"));
const updateRoom_1 = __importDefault(require("../../application/user-cases/room/updateRoom"));
function roomController(roomRepository, roomRepositoryDbImpl, hotelRepository, hotelRepositoryDbImpl) {
    const repositoryRoom = roomRepository(roomRepositoryDbImpl());
    const repositoryHotel = hotelRepository(hotelRepositoryDbImpl());
    const handleAddRoom = (0, express_async_handler_1.default)(async (req, res, next) => {
        const roomData = req.body;
        const hotelId = req.params?.hotelId;
        const data = await (0, addRoom_1.default)(hotelId, roomData, repositoryRoom, repositoryHotel);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Room has been added successfully",
            data: data,
        });
    });
    const handleGetAllRooms = (0, express_async_handler_1.default)(async (req, res) => {
        const hotelId = req.params?.hotelId;
        const data = await (0, getAllRooms_1.default)(hotelId, repositoryRoom, repositoryHotel);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Rooms details has been successfull",
            data: data,
        });
    });
    const handleGetRoomDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { hotelId, roomId } = req.params;
        const data = await (0, getRoomDetails_1.default)(hotelId, roomId, repositoryHotel, repositoryRoom);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Room details fetch successfully",
            data: data,
        });
    });
    const handleAddRoomImage = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { hotelId, roomId } = req.params;
        const { imgId } = req.body;
        const data = await (0, addImage_1.default)(hotelId, roomId, imgId, repositoryHotel, repositoryRoom);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Image added successfully",
            data: data,
        });
    });
    const handleSearchRoom = (0, express_async_handler_1.default)(async (req, res, next) => {
        const search = req.body;
        const data = await (0, searchRoom_1.default)(search, repositoryRoom);
        console.log(data);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "search result has been fetched",
            data: data,
        });
    });
    const handleUpdateRoomDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { id } = req.params;
        const updates = req.body;
        console.log(updates);
        const data = await (0, updateRoom_1.default)(id, updates, repositoryRoom);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "successfully updated room",
            data: data,
        });
    });
    return {
        handleAddRoom,
        handleGetAllRooms,
        handleGetRoomDetails,
        handleAddRoomImage,
        handleSearchRoom,
        handleUpdateRoomDetails,
    };
}
exports.default = roomController;
