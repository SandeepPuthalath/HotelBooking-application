import express from "express";
import bannerController from "../../../adapters/bannerController/bannerController";
import bannerRepository from "../../../application/repositories/bannerRepository";
import bannerRepositoryDB from "../../database/mongoDB/repositories/bannerRepositoryDB";
import adminJwtTokenVerification from "../middlewares/adminJwtTokenVerificationts";

export default function bannerRouter() {
  const router = express.Router();

  const controller = bannerController(bannerRepository, bannerRepositoryDB);

  router
    .route("/")
    .post(adminJwtTokenVerification, controller.handleCreateBanner)
    .get(controller.handleFetchingBanners);

  router
    .route("/:bannerId")
    .get(adminJwtTokenVerification, controller.handleFetchingBannerDetails)
    .put(adminJwtTokenVerification, controller.handleBannerDetailsUpdate)
    .patch(adminJwtTokenVerification, controller.handleBannerImgChange)
    .delete(adminJwtTokenVerification, controller.handleBannerDelete);

  return router;
}
