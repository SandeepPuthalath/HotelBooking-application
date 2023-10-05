"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const add_1 = __importDefault(require("../../application/user-cases/hotel/add"));
const update_1 = __importDefault(require("../../application/user-cases/hotel/update"));
const view_1 = __importDefault(require("../../application/user-cases/hotel/view"));
const viewAll_1 = __importDefault(require("../../application/user-cases/hotel/viewAll"));
const remove_1 = __importDefault(require("../../application/user-cases/hotel/remove"));
const httpStatus_1 = require("../../types/httpStatus");
const mongoose_1 = __importDefault(require("mongoose"));
const getUserHotel_1 = __importDefault(require("../../application/user-cases/hotel/getUserHotel"));
const viewByDestination_1 = __importDefault(require("../../application/user-cases/hotel/viewByDestination"));
const ratingHotel_1 = __importDefault(require("../../application/user-cases/hotel/ratingHotel"));
const fetchFeaturedHotels_1 = __importDefault(require("../../application/user-cases/hotel/fetchFeaturedHotels"));
function hotelController(hotelRepositoryDb, hotelRepositoryDbImpl) {
    const repository = hotelRepositoryDb(hotelRepositoryDbImpl());
    const handleAddHotel = (0, express_async_handler_1.default)(async (req, res, next) => {
        const hotelData = req.body;
        const userId = req.params?.userId;
        const data = await (0, add_1.default)(userId, hotelData, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Hotel added successfully",
            data: data,
        });
    });
    const handleUpdateHotel = (0, express_async_handler_1.default)(async (req, res, next) => {
        const updates = req.body;
        const { id } = req.params;
        const data = await (0, update_1.default)(new mongoose_1.default.Types.ObjectId(id), updates, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Hotel has been updated successfully",
            data: data,
        });
    });
    const handleDeleteHotel = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { id } = req.params;
        await (0, remove_1.default)(new mongoose_1.default.Types.ObjectId(id), repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Hotel has been removed successfully",
        });
    });
    const handleViewHotel = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        const data = await (0, view_1.default)(new mongoose_1.default.Types.ObjectId(id), repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Hotel details has been fetched successfully",
            data: data,
        });
    });
    const handleViewAllHotels = (0, express_async_handler_1.default)(async (req, res, next) => {
        const data = await (0, viewAll_1.default)(repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "All hotels has been fetched successfully",
            data: data,
        });
    });
    const handleGetMyHotelDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const userId = req.params?.userId;
        const data = await (0, getUserHotel_1.default)(new mongoose_1.default.Types.ObjectId(userId), repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User hotel has been fetched successfully",
            data: data,
        });
    });
    const handleDestinationSearch = (0, express_async_handler_1.default)(async (req, res, next) => {
        const destination = req.params?.destination;
        const data = await (0, viewByDestination_1.default)(destination, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "search result has been fetched",
            data: data,
        });
    });
    const handleRating = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { star, userId, hotelId } = req.body;
        const result = await (0, ratingHotel_1.default)(star, userId, hotelId, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Rating added successfully",
            result: result,
        });
    });
    const handleGetFeatureHotels = async (req, res, next) => {
        try {
            const featured = await (0, fetchFeaturedHotels_1.default)(repository);
            res.status(httpStatus_1.HttpStatus.OK).json(featured);
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        handleAddHotel,
        handleUpdateHotel,
        handleDeleteHotel,
        handleViewHotel,
        handleViewAllHotels,
        handleGetMyHotelDetails,
        handleDestinationSearch,
        handleRating,
        handleGetFeatureHotels,
    };
}
exports.default = hotelController;
