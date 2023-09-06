"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const read_1 = require("../../application/user-cases/user/read");
const httpStatus_1 = require("../../types/httpStatus");
function adminController(userDbRepository, userDbRepositoryImpl) {
    const userRespository = userDbRepository(userDbRepositoryImpl());
    const handleGetAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
        console.log("got to admin user fetching api");
        const data = await (0, read_1.getAllUsers)(userRespository);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "All users details has been fetched",
            data: data,
        });
    });
    const handleGetUserDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const userId = req.params?.userId;
        const data = await (0, read_1.getUserProfile)(userId, userRespository);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "user details has been fetched",
            data: data,
        });
    });
    return {
        handleGetAllUsers,
        handleGetUserDetails,
    };
}
exports.default = adminController;
