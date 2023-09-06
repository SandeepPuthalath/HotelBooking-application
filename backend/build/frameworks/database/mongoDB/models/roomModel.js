"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RoomSchema = new mongoose_1.default.Schema({
    hoteId: {
        type: String,
        trim: true,
        require: true,
    },
    title: {
        type: String,
        trim: true,
        require: true,
    },
    price: {
        type: Number,
        trim: true,
        require: true,
    },
    maxPeople: {
        type: Number,
        trim: true,
        require: true,
    },
    photos: {
        type: [String],
    },
    type: {
        type: String,
        trim: true,
    },
    desc: {
        type: String,
        trim: true,
        require: true,
    },
    unavailbleDates: { type: [Date] },
}, { timestamps: true });
RoomSchema.pre("save", async function (next) {
    const currentDate = new Date();
    this.unavailbleDates = this.unavailbleDates.filter(date => date >= currentDate);
    next();
});
const Room = mongoose_1.default.model("Room", RoomSchema);
exports.default = Room;
