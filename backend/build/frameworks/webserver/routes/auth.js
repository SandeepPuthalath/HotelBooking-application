"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../../adapters/authController/authController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const authService_1 = require("../../services/authService");
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    router.post('/signup', controller.registerUser);
    router.post('/login', controller.loginUser);
    router.post('/send-otp', controller.sendOtp);
    router.post('/verify-otp', controller.verifyOtp);
    return router;
};
exports.default = authRouter;
