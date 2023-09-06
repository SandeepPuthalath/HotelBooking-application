"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const banner_1 = __importDefault(require("../../../entities/banner"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function create(title, desc, cloudinaryImgUrl, repository) {
    if (!title || !desc || !cloudinaryImgUrl) {
        throw new appError_1.default("Fill All informations", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const newBanner = (0, banner_1.default)(title, desc, cloudinaryImgUrl);
    return await repository.createBanner(newBanner);
}
exports.default = create;
