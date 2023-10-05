"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.sendOTP = exports.userLogin = exports.userRegister = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const user_1 = __importDefault(require("../../../entities/user"));
const read_1 = require("../user/read");
const userRegister = async (user, userRepository, authService) => {
    user.email = user?.email.toLowerCase();
    const isExistingEmail = await userRepository.getUserByEmail(user?.email);
    if (isExistingEmail) {
        throw new appError_1.default("This email already register with an account", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    user.password = await authService.encryptPassword(user?.password);
    const { firstName, lastName, email, phoneNumber, password } = user;
    const userEntity = (0, user_1.default)(firstName, lastName, email, phoneNumber, password);
    console.log(userEntity.getLastName());
    const createdUser = await userRepository.addUser(userEntity);
    const applicantId = createdUser?._id;
    const token = authService.generateToken(createdUser?._id.toString());
    return { token, applicantId };
};
exports.userRegister = userRegister;
const userLogin = async (email, password, userRepository, authService) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const applicantId = user?._id;
    const isPasswordCorrect = await authService.comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default("Sorry, your password was incorrect. Please double-check your password", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const userDetails = (0, read_1.removePasswordField)(user);
    const token = authService.generateToken(JSON.stringify(userDetails));
    return { token, applicantId };
};
exports.userLogin = userLogin;
// export const googleUserLogin = async (
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   },
//   userRepository: ReturnType<UserDbInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   const isExistingEmail = await userRepository.getUserByEmail(user.email);
//   if (isExistingEmail) {
//     const token = authService.generateToken(isExistingEmail._id.toString());
//     return token;
//   } else {
//     const createdUser = await userRepository.addUser(user);
//     const applicantId = createdUser._id;
//     const token: string = authService.generateToken(createdUser._id.toString());
//     return { token, applicantId };
//   }
// };
const sendOTP = async (phoneNumber, userRepository, authService) => {
    if (!phoneNumber) {
        throw new appError_1.default("Phone number field cannot be empty", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const user = await userRepository.getUserByPhoneNumber(parseInt(phoneNumber));
    if (!user) {
        throw new appError_1.default("Sorry, There is no Account linked with this phone number", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return await authService.generateOTP(phoneNumber);
};
exports.sendOTP = sendOTP;
const verifyOTP = async (phoneNumber, otp, userRepository, authService) => {
    if (!otp) {
        throw new appError_1.default("Please provide a valid OTP", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const verification = await authService.verifyOTP(phoneNumber, otp);
    if (!verification) {
        throw new appError_1.default("OTP does not match, Please provide a valid OTP", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const user = await userRepository.getUserByPhoneNumber(parseInt(phoneNumber));
    const applicantId = user?._id;
    if (!user) {
        throw new appError_1.default("this user doesn't exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const token = authService.generateToken(user._id.toString());
    return { token, applicantId };
};
exports.verifyOTP = verifyOTP;
