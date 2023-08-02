"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleUserLogin = exports.userLogin = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const userRegister = async (user, userRepository, authService) => {
    user.email = user.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        throw new appError_1.default("existing email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = await authService.encryptPassword(user.password);
    const createdUser = await userRepository.addUser(user);
    const applicantId = createdUser._id;
    const token = authService.generateToken(createdUser._id.toString());
    return { token, applicantId };
};
exports.userRegister = userRegister;
const userLogin = async (email, password, userRepository, authService) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    return token;
};
exports.userLogin = userLogin;
const googleUserLogin = async (user, userRepository, authService) => {
    const isExistingEmail = await userRepository.getUserByEmail(user.email);
    if (isExistingEmail) {
        const token = authService.generateToken(isExistingEmail._id.toString());
        return token;
    }
    else {
        const createdUser = await userRepository.addUser(user);
        const applicantId = createdUser._id;
        const token = authService.generateToken(createdUser._id.toString());
        return { token, applicantId };
    }
};
exports.googleUserLogin = googleUserLogin;
