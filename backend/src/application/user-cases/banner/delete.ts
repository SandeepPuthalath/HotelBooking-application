import { BannerRepositoryDBType } from "../../../frameworks/database/mongoDB/repositories/bannerRepositoryDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";



export default async function bannerDelete(bannerId: string, repository: ReturnType<BannerRepositoryDBType>){

    if(!bannerId){
        throw new AppError("Bad request", HttpStatus.BAD_REQUEST);
    }

    return await repository.deleteBanner(bannerId);

}