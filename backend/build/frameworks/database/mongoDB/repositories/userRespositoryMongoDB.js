"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const userRepositoryMongoDB = () => {
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email });
        return user;
    };
    //add user
    const addUser = async (user) => {
        const newUser = new userModel_1.default(user);
        newUser.save();
        return newUser;
    };
    return {
        getUserByEmail,
        addUser,
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
