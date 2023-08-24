import { BannerEntityType } from "../../../../entities/banner"
import Banner from "../models/bannerModel"


export default function bannerRepositoryDB(){

    const createBanner = async (bannerEntity: BannerEntityType) => {
        const newBanner = new Banner({
            title: bannerEntity.getTitle(),
            desc: bannerEntity.getDesc(),
            cloudinaryImgUrl: bannerEntity.getCloudinaryImgUrl()
        })

        await newBanner.save()

        return newBanner;
    }

    const getBanners = async () => await Banner.find();

    const getBannerById = async (id: string) => await Banner.findById(id)

    const updateBannerImg = async (id: string, cloudinarryImgUrl: string) => await Banner.findByIdAndUpdate(id, {$set: {cloudinaryImgUrl: cloudinarryImgUrl}});

    const updateBannerDetails = async (id: string, updates: {
        title: string,
        desc: string,
    }) => await Banner.findByIdAndUpdate(id, {...updates},{new : true});

    const deleteBanner = async (id: string) => await Banner.findByIdAndDelete(id);

    return {
        createBanner,
        getBanners,
        getBannerById,
        updateBannerImg,
        updateBannerDetails,
        deleteBanner
    }
}


export type BannerRepositoryDBType = typeof bannerRepositoryDB