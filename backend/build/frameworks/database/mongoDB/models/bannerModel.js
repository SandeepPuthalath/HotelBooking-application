"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bannerSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    desc: {
        type: String,
        require: true,
        trim: true
    },
    cloudinaryImgUrl: {
        type: String,
        require: true,
        trim: true,
    }
});
const Banner = mongoose_1.default.model("banner", bannerSchema);
exports.default = Banner;
