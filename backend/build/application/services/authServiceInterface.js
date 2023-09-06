"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const encryptPassword = (password) => service.encryptPassword(password);
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const verifyPassword = (token) => service.verifyToken(token);
    const generateToken = (payload) => service.generateToken(payload);
    const verifyToken = (payload) => service.verifyToken(payload);
    const generateOTP = (phoneNumber) => service.generateOTP(phoneNumber);
    const verifyOTP = (phoneNumber, otp) => service.verifyOTP(phoneNumber, otp);
    const verifyAdmin = (token) => service.verifyAdmin(token);
    return {
        encryptPassword,
        comparePassword,
        verifyPassword,
        generateToken,
        verifyToken,
        generateOTP,
        verifyOTP,
        verifyAdmin
    };
};
exports.authServiceInterface = authServiceInterface;
