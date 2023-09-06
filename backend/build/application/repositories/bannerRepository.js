"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bannerRepository(repository) {
    const createBanner = async (bannerEntity) => await repository.createBanner(bannerEntity);
    const getBanners = async () => await repository.getBanners();
    const getBannerById = async (id) => await repository.getBannerById(id);
    const updateBannerImg = async (id, cloudinarryImgUrl) => await repository.updateBannerImg(id, cloudinarryImgUrl);
    const updateBannerDetails = async (id, updates) => await repository.updateBannerDetails(id, updates);
    const deleteBanner = async (id) => await repository.deleteBanner(id);
    return {
        createBanner,
        getBanners,
        getBannerById,
        updateBannerImg,
        updateBannerDetails,
        deleteBanner,
    };
}
exports.default = bannerRepository;
