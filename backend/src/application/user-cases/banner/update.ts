import { BannerRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export const updateImage = async (
  bannerId: string,
  cloudinarryImgUrl: string,
  repository: ReturnType<BannerRepositoryDBType>
) => {
  if (!bannerId || !cloudinarryImgUrl) {
    throw new AppError(
      "Somthing went wrong please upload again",
      HttpStatus.BAD_REQUEST
    );
  }

  return await repository.updateBannerImg(bannerId, cloudinarryImgUrl);
};

export const updateDetails = async (
  bannerId: string,
  updates: {
    title: string;
    desc: string;
},
repository: ReturnType<BannerRepositoryDBType>
) => {
  if (!bannerId || !updates?.title || !updates?.desc) {
    throw new AppError("Please provide valid information", HttpStatus.BAD_REQUEST);
  }

  const banner = await repository.updateBannerDetails(bannerId, updates);

  return banner;
};
