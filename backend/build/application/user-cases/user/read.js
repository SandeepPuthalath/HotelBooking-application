"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserProfile = exports.removePasswordField = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
// import { CreateUserInterface } from "../../../types/userInterface";
function removePasswordField(object) {
    let { _id, firstName, lastName, email, phoneNumber, role, GSTNumber, createdAt, updatedAt, pic } = object;
    createdAt = new Date(createdAt).toLocaleString().split(",")[0];
    updatedAt = new Date(updatedAt).toLocaleString().split(",")[0];
    return { _id, firstName, lastName, email, phoneNumber, role, GSTNumber, createdAt, updatedAt, pic };
}
exports.removePasswordField = removePasswordField;
const getUserProfile = async (id, userRepository) => {
    if (!id) {
        throw new appError_1.default('Somthing went wrong please log in again', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const user = await userRepository.getUserById(id);
    const data = removePasswordField(user);
    if (!user) {
        throw new appError_1.default('User Dose not exist', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    return data;
};
exports.getUserProfile = getUserProfile;
const getAllUsers = async (userRepository) => {
    const users = await userRepository.getAllUsers();
    const data = users.map(user => removePasswordField(user));
    return data;
};
exports.getAllUsers = getAllUsers;
