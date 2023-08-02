"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/user-cases/auth/userAuth");
const userAuth_2 = require("../../application/user-cases/auth/userAuth");
const authController = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    // const googleAuthServices = googleAuthServiceInterface(googleAuthService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const { token, applicantId } = await (0, userAuth_2.userRegister)(user, dbRepositoryUser, authService);
        res.json({
            status: 'success',
            message: 'new user registered',
            token,
            applicantId,
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const token = await (0, userAuth_2.userLogin)(email, password, dbRepositoryUser, authService);
        res.json({
            status: 'success',
            message: 'user verified',
            token,
        });
    });
    const loginWithGoogle = (0, express_async_handler_1.default)(async (req, res) => {
        const userDetails = req.body;
        const user = {
            firstName: userDetails?._tokenResponse?.firstName,
            lastName: userDetails?._tokenResponse?.lastName,
            email: userDetails?._tokenResponse?.email,
        };
        const result = await (0, userAuth_1.googleUserLogin)(user, dbRepositoryUser, authService);
        const token = result?.token;
        const profile = result?.profile;
        const applicantId = result?.applicantId;
        if (result?.token && result?.profile) {
            res.json({
                status: 'success',
                message: 'user verified',
                token,
                profile,
                applicantId,
            });
        }
        else {
            const token = result;
            res.json({
                status: 'success',
                message: 'user verified',
                token,
            });
        }
    });
    return {
        registerUser,
        loginUser,
        loginWithGoogle,
    };
};
exports.default = authController;
