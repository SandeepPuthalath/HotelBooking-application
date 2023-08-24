import { BannerEntityType } from "../../entities/banner";
import { BannerRepositoryDBType } from "../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";


export default function bannerRepository(
    repository: ReturnType<BannerRepositoryDBType>
){

    const createBanner = async (bannerEntity: BannerEntityType) => await repository.createBanner(bannerEntity);

    const getBanners = async () => await repository.getBanners();

    const getBannerById = async (id: string) => await repository.getBannerById(id);

    const updateBannerImg = async (id: string, cloudinarryImgUrl: string) => await repository.updateBannerImg(id, cloudinarryImgUrl);

    const updateBannerDetails = async (id: string, updates: {
        title: string,
        desc: string,
    }) =>  await repository.updateBannerDetails(id, updates)

    const deleteBanner = async (id: string) => await repository.deleteBanner(id)

    return {
        createBanner,
        getBanners,
        getBannerById,
        updateBannerImg,
        updateBannerDetails,
        deleteBanner,
    }

}


export type BannerRepositoryType = typeof bannerRepository