"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bannerController_1 = __importDefault(require("../../../adapters/bannerController/bannerController"));
const bannerRepository_1 = __importDefault(require("../../../application/repositories/bannerRepository"));
const bannerRepositoryDB_1 = __importDefault(require("../../database/mongoDB/repositories/bannerRepositoryDB"));
const adminJwtTokenVerificationts_1 = __importDefault(require("../middlewares/adminJwtTokenVerificationts"));
function bannerRouter() {
    const router = express_1.default.Router();
    const controller = (0, bannerController_1.default)(bannerRepository_1.default, bannerRepositoryDB_1.default);
    router
        .route("/")
        .post(adminJwtTokenVerificationts_1.default, controller.handleCreateBanner)
        .get(controller.handleFetchingBanners);
    router
        .route("/:bannerId")
        .get(adminJwtTokenVerificationts_1.default, controller.handleFetchingBannerDetails)
        .put(adminJwtTokenVerificationts_1.default, controller.handleBannerDetailsUpdate)
        .patch(adminJwtTokenVerificationts_1.default, controller.handleBannerImgChange)
        .delete(adminJwtTokenVerificationts_1.default, controller.handleBannerDelete);
    return router;
}
exports.default = bannerRouter;
