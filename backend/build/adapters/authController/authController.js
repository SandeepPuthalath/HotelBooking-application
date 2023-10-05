"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/user-cases/auth/userAuth");
// import { Types } from 'mongoose';
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const { token, applicantId } = await (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "User has been registered succesfully",
            token,
            applicantId,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password);
        const { token, applicantId } = await (0, userAuth_1.userLogin)(email, password, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
            applicantId
        });
    });
    const sendOtp = (0, express_async_handler_1.default)(async (req, res) => {
        const { phoneNumber } = req.body;
        const otpStatus = await (0, userAuth_1.sendOTP)(phoneNumber, dbRepositoryUser, authService);
        res.json({ status: "success", message: "otp has been send", otpStatus });
    });
    const verifyOtp = (0, express_async_handler_1.default)(async (req, res) => {
        const { phoneNumber, otp } = req.body;
        const { token, applicantId } = await (0, userAuth_1.verifyOTP)(phoneNumber, otp, dbRepositoryUser, authService);
        res.json({
            status: "success",
            message: "user verified",
            token,
            applicantId
        });
    });
    return {
        registerUser,
        loginUser,
        sendOtp,
        verifyOtp,
    };
};
exports.default = authController;
