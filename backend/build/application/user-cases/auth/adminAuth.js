"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const adminLogin = async (email, password, services, config) => {
    if (email !== config.ADMIN_EMAIL) {
        throw new appError_1.default("Credentials are wrong", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (password !== config.ADMIN_PASSWORD) {
        throw new appError_1.default("Sorry, your password was incorrect. Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const admin = {
        email,
        admin: true
    };
    const token = services.generateToken(JSON.stringify(admin));
    return token;
};
exports.adminLogin = adminLogin;
