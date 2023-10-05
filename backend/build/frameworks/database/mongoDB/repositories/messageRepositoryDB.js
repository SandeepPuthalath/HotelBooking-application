"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
function messageRepositoryDB() {
    const addMessage = async (user, hotel, message, sender) => (await MessageModel_1.default.create({
        user,
        hotel,
        message,
        sender,
    })).populate('user', ["firstName", "lastName",]);
    const getMessages = async (hotelId) => await MessageModel_1.default.find({ hotel: hotelId })
        .populate("user", "_id firstName lastName")
        .sort({ sendTime: 1 });
    return {
        addMessage,
        getMessages
    };
}
exports.default = messageRepositoryDB;
