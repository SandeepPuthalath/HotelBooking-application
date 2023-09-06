"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileImg = exports.changeUserRole = exports.updateUserProfile = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const read_1 = require("./read");
const updateUserProfile = async (id, updates, userRepository) => {
    if (!updates) {
        throw new appError_1.default("please provide something to update", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const user = await userRepository.updateUserByProperty(id, updates);
    const data = (0, read_1.removePasswordField)(user);
    if (!data) {
        throw new appError_1.default("User Dose not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return data;
};
exports.updateUserProfile = updateUserProfile;
const changeUserRole = async (id, userRepository) => {
    if (!id) {
        throw new appError_1.default("Somthing went wrong please log in again", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const data = await userRepository.getUserById(id);
    if (!data) {
        throw new appError_1.default("User Dose not exist", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    data?.role === "normal" ? (data.role = "business") : (data.role = "normal");
    await data.save();
    const user = (0, read_1.removePasswordField)(data);
    return user;
};
exports.changeUserRole = changeUserRole;
const updateProfileImg = async (id, url, repository) => {
    if (!id || !url) {
        throw new appError_1.default("Somthing went wrong", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await repository.changeProfileImg(id, url);
};
exports.updateProfileImg = updateProfileImg;
