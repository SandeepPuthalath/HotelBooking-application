import { BannerRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";






export const fetchAllBanners = async (
    repository: ReturnType<BannerRepositoryDBType>
) => {

    const banners = await repository.getBanners();

    return banners;

}


export const fetchBannerDetails = async (
    bannerId: string,
    repository: ReturnType<BannerRepositoryDBType>,
) => {

    if(!bannerId){
        throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
    }

    const banner = await repository.getBannerById(bannerId);

    if(!banner){
        throw new AppError("Banner dose not exists", HttpStatus.NOT_FOUND)
    }

    return banner;
}