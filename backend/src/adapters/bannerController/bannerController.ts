import expressAsyncHandler from "express-async-handler";
import { BannerRepositoryType } from "../../application/repositories/bannerRepository";
import { BannerRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/httpStatus";
import create from "../../application/user-cases/banner/create";
import {
  fetchAllBanners,
  fetchBannerDetails,
} from "../../application/user-cases/banner/read";
import {
  updateDetails,
  updateImage,
} from "../../application/user-cases/banner/update";
import bannerDelete from "../../application/user-cases/banner/delete";

export default function bannerController(
  bannerRepoInt: BannerRepositoryType,
  bannerRepoImpl: BannerRepositoryDBType
) {
  const repository = bannerRepoInt(bannerRepoImpl());

  const handleCreateBanner = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { title, desc, cloudinaryImgUrl } = req.body;

      await create(title, desc, cloudinaryImgUrl, repository);

      res
        .status(HttpStatus.OK)
        .json({ status: "success", message: "successfully add banner" });
    }
  );

  const handleFetchingBanners = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const banners = await fetchAllBanners(repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "All banners has been fetched successfully",
        banners,
      });
    }
  );

  const handleFetchingBannerDetails = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bannerId = req.params?.bannerId;

      const banner = await fetchBannerDetails(bannerId, repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Banner details has been fetched successfully",
        banner,
      });
    }
  );

  const handleBannerImgChange = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bannerId = req.params?.bannerId;
      const { cloudinaryImgUrl } = req.body;
      console.log(bannerId, cloudinaryImgUrl);
      const banner = await updateImage(bannerId, cloudinaryImgUrl, repository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Banner image has been updated successfully",
        banner
      });
    }
  );

  const handleBannerDetailsUpdate = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const bannerId = req.params?.bannerId;
      const updates = req.body;

      const banner = await updateDetails(bannerId, updates, repository);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "Banner details has been updated succesfully",
          updated: banner
        });
    }
  );

  const handleBannerDelete = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bannerId = req.params?.bannerId;
        await bannerDelete(bannerId, repository);

        res.status(HttpStatus.OK).json({
            status: "success",
            message: "Banner has been deleted successfully",
          });
    })

  return {
    handleCreateBanner,
    handleFetchingBanners,
    handleFetchingBannerDetails,
    handleBannerImgChange,
    handleBannerDetailsUpdate,
    handleBannerDelete,
  };
}
