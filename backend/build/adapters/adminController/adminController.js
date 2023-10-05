"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const read_1 = require("../../application/user-cases/user/read");
const httpStatus_1 = require("../../types/httpStatus");
const fetchDashboardDetails_1 = __importDefault(require("../../application/user-cases/admin/fetchDashboardDetails"));
function adminController(userDbRepository, userDbRepositoryImpl, bookingRepoInt, bookingRepoImpl, hotelRepoInt, hotelRepoImpl) {
    const userRespository = userDbRepository(userDbRepositoryImpl());
    const bookingRepository = bookingRepoInt(bookingRepoImpl());
    const hotelRepository = hotelRepoInt(hotelRepoImpl());
    const handleGetAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
        console.log("got to admin user fetching api");
        const data = await (0, read_1.getAllUsers)(userRespository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "All users details has been fetched",
            data: data,
        });
    });
    const handleGetUserDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const userId = req.params?.userId;
        const data = await (0, read_1.getUserProfile)(userId, userRespository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "user details has been fetched",
            data: data,
        });
    });
    const handleFetchingDashboardDatas = (0, express_async_handler_1.default)(async (req, res, next) => {
        const data = await (0, fetchDashboardDetails_1.default)(userRespository, bookingRepository, hotelRepository);
        res.status(httpStatus_1.HttpStatus.OK).json(data);
    });
    return {
        handleGetAllUsers,
        handleGetUserDetails,
        handleFetchingDashboardDatas,
    };
}
exports.default = adminController;
