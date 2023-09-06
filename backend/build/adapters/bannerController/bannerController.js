"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const httpStatus_1 = require("../../types/httpStatus");
const create_1 = __importDefault(require("../../application/user-cases/banner/create"));
const read_1 = require("../../application/user-cases/banner/read");
const update_1 = require("../../application/user-cases/banner/update");
const delete_1 = __importDefault(require("../../application/user-cases/banner/delete"));
function bannerController(bannerRepoInt, bannerRepoImpl) {
    const repository = bannerRepoInt(bannerRepoImpl());
    const handleCreateBanner = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { title, desc, cloudinaryImgUrl } = req.body;
        await (0, create_1.default)(title, desc, cloudinaryImgUrl, repository);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({ status: "success", message: "successfully add banner" });
    });
    const handleFetchingBanners = (0, express_async_handler_1.default)(async (req, res, next) => {
        const banners = await (0, read_1.fetchAllBanners)(repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "All banners has been fetched successfully",
            banners,
        });
    });
    const handleFetchingBannerDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bannerId = req.params?.bannerId;
        const banner = await (0, read_1.fetchBannerDetails)(bannerId, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Banner details has been fetched successfully",
            banner,
        });
    });
    const handleBannerImgChange = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bannerId = req.params?.bannerId;
        const { cloudinaryImgUrl } = req.body;
        console.log(bannerId, cloudinaryImgUrl);
        const banner = await (0, update_1.updateImage)(bannerId, cloudinaryImgUrl, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Banner image has been updated successfully",
            banner
        });
    });
    const handleBannerDetailsUpdate = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bannerId = req.params?.bannerId;
        const updates = req.body;
        const banner = await (0, update_1.updateDetails)(bannerId, updates, repository);
        res
            .status(httpStatus_1.HttpStatus.OK)
            .json({
            status: "success",
            message: "Banner details has been updated succesfully",
            updated: banner
        });
    });
    const handleBannerDelete = (0, express_async_handler_1.default)(async (req, res, next) => {
        const bannerId = req.params?.bannerId;
        await (0, delete_1.default)(bannerId, repository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Banner has been deleted successfully",
        });
    });
    return {
        handleCreateBanner,
        handleFetchingBanners,
        handleFetchingBannerDetails,
        handleBannerImgChange,
        handleBannerDetailsUpdate,
        handleBannerDelete,
    };
}
exports.default = bannerController;
