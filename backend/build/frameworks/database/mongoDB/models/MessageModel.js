"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
        require: true,
    },
    hotel: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "hotel"
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "User"
    },
    sender: {
        type: String,
        require: true,
    },
    sendTime: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const Message = mongoose_1.default.model("message", MessageSchema);
exports.default = Message;
