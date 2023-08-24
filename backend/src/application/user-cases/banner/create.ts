import banner from "../../../entities/banner";
import { BannerRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function create(
  title: string,
  desc: string,
  cloudinaryImgUrl: string,
  repository: ReturnType<BannerRepositoryDBType>
) {
  if (!title || !desc || !cloudinaryImgUrl) {
    throw new AppError("Fill All informations", HttpStatus.BAD_REQUEST);
  }

  const newBanner = banner(title, desc, cloudinaryImgUrl);

  return await repository.createBanner(newBanner)
}
