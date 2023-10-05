"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const destinationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    photo: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    featured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const Destination = mongoose_1.default.model("destination", destinationSchema);
exports.default = Destination;
