"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDetails = exports.updateImage = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const updateImage = async (bannerId, cloudinarryImgUrl, repository) => {
    if (!bannerId || !cloudinarryImgUrl) {
        throw new appError_1.default("Somthing went wrong please upload again", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    return await repository.updateBannerImg(bannerId, cloudinarryImgUrl);
};
exports.updateImage = updateImage;
const updateDetails = async (bannerId, updates, repository) => {
    if (!bannerId || !updates?.title || !updates?.desc) {
        throw new appError_1.default("Please provide valid information", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const banner = await repository.updateBannerDetails(bannerId, updates);
    return banner;
};
exports.updateDetails = updateDetails;
