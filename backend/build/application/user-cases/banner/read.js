"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBannerDetails = exports.fetchAllBanners = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const fetchAllBanners = async (repository) => {
    const banners = await repository.getBanners();
    return banners;
};
exports.fetchAllBanners = fetchAllBanners;
const fetchBannerDetails = async (bannerId, repository) => {
    if (!bannerId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    const banner = await repository.getBannerById(bannerId);
    if (!banner) {
        throw new appError_1.default("Banner dose not exists", httpStatus_1.HttpStatus.NOT_FOUND);
    }
    return banner;
};
exports.fetchBannerDetails = fetchBannerDetails;
