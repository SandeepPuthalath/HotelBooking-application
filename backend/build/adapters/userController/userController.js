"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const read_1 = require("../../application/user-cases/user/read");
const httpStatus_1 = require("../../types/httpStatus");
const update_1 = require("../../application/user-cases/user/update");
const userController = (userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const handleGetUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.params.userId;
        const data = await (0, read_1.getUserProfile)(userId, dbRepositoryUser);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User Details has been feteched",
            data,
        });
    });
    const HandleChangeUserRole = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.params.userId;
        const data = await (0, update_1.changeUserRole)(userId, dbRepositoryUser);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User role has been updated",
            data,
        });
    });
    const handleUpdateUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.params.userId;
        const updates = req.body;
        const data = await (0, update_1.updateUserProfile)(userId, updates, dbRepositoryUser);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User profile has been updated",
            data,
        });
    });
    const handleUpdateProfileImage = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.params.userId;
        const { secure_url } = req.body;
        const data = await (0, update_1.updateProfileImg)(userId, secure_url, dbRepositoryUser);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User profile img has been updated",
            data,
        });
    });
    return {
        HandleChangeUserRole,
        handleGetUserProfile,
        handleUpdateUserProfile,
        handleUpdateProfileImage,
    };
};
exports.default = userController;
