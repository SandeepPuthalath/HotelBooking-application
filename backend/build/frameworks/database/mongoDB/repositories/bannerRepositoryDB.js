"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bannerModel_1 = __importDefault(require("../models/bannerModel"));
function bannerRepositoryDB() {
    const createBanner = async (bannerEntity) => {
        const newBanner = new bannerModel_1.default({
            title: bannerEntity.getTitle(),
            desc: bannerEntity.getDesc(),
            cloudinaryImgUrl: bannerEntity.getCloudinaryImgUrl()
        });
        await newBanner.save();
        return newBanner;
    };
    const getBanners = async () => await bannerModel_1.default.find();
    const getBannerById = async (id) => await bannerModel_1.default.findById(id);
    const updateBannerImg = async (id, cloudinarryImgUrl) => await bannerModel_1.default.findByIdAndUpdate(id, { $set: { cloudinaryImgUrl: cloudinarryImgUrl } });
    const updateBannerDetails = async (id, updates) => await bannerModel_1.default.findByIdAndUpdate(id, { ...updates }, { new: true });
    const deleteBanner = async (id) => await bannerModel_1.default.findByIdAndDelete(id);
    return {
        createBanner,
        getBanners,
        getBannerById,
        updateBannerImg,
        updateBannerDetails,
        deleteBanner
    };
}
exports.default = bannerRepositoryDB;
