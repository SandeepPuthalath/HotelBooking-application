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
        const newUser = new userModel_1.default({
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            phoneNumber: user.getPhoneNumber(),
            password: user.getPassword(),
        });
        newUser.save();
        return newUser;
    };
    // getting user by phone number
    const getUserByPhoneNumber = async (phoneNumber) => {
        const user = await userModel_1.default.findOne({
            phoneNumber,
        });
        return user;
    };
    const getUserById = async (id) => await userModel_1.default.findById(id);
    const updateUserByProperty = async (id, updates) => {
        const user = await userModel_1.default.findByIdAndUpdate(id, updates, { new: true });
        return user;
    };
    const changeProfileImg = async (id, url) => await userModel_1.default.findByIdAndUpdate(id, { $set: { pic: url } }, { upsert: true, new: true });
    const getAllUsers = async () => await userModel_1.default.find();
    const changeUserRole = async (id, GSTNumber) => {
        const data = await userModel_1.default.findByIdAndUpdate(id, { $set: { role: "business", GSTNumber: GSTNumber } }, { new: true });
        return data;
    };
    const countUsers = async () => await userModel_1.default.countDocuments();
    const fetchNewUsers = async () => await userModel_1.default.find().sort({ createdAt: -1 }).limit(4);
    return {
        getUserByEmail,
        addUser,
        getUserByPhoneNumber,
        getUserById,
        updateUserByProperty,
        getAllUsers,
        changeUserRole,
        changeProfileImg,
        countUsers,
        fetchNewUsers,
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
