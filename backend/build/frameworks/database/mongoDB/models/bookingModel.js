"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    phoneNumber: {
        type: Number,
        trim: true,
        require: true,
    },
    email: {
        type: String,
        trim: true,
        require: true,
    },
    address: {
        type: String,
        trim: true,
        require: true,
    },
    roomId: {
        type: mongoose_1.default.Types.ObjectId,
        trim: true,
        require: true,
        ref: "rooms"
    },
    hotelId: {
        type: mongoose_1.default.Types.ObjectId,
        trim: true,
        require: true,
        ref: "hotels"
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        trim: true,
        require: true,
        ref: "users"
    },
    maxPeople: {
        type: Number,
        trim: true,
        require: true,
    },
    checkInDate: {
        type: Date,
        trim: true,
        require: true,
    },
    checkOutDate: {
        type: Date,
        trim: true,
        require: true,
    },
    totalDays: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        trim: true,
        require: true
    },
    paymentMethod: {
        type: String,
        trim: true,
        default: "pay_on_checkout"
    },
    paymentStatus: {
        type: String,
        trim: true,
        default: "pending"
    },
    status: {
        type: String,
        trim: true,
        default: "booked"
    }
}, { timestamps: true });
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
