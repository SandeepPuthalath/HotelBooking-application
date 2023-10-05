"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const hotelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    destination: {
        type: String,
        require: true,
    },
    distance: {
        type: String,
        require: true,
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        require: true,
    },
    // rating: {
    //   type: Number,
    //   require: true,
    //   default: 0,
    //   min: 0,
    //   max: 5,
    // },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        require: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        require: true,
    },
    ratings: [
        {
            star: Number,
            postedby: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "users" }
        },
    ],
    totalRating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const Hotel = (0, mongoose_1.model)("Hotel", hotelSchema);
exports.default = Hotel;
