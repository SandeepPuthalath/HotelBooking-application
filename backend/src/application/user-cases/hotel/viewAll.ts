import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";




export default async function viewAll(repository: ReturnType<hotelRepositoryDbInterface>){

    const data = await repository.viewAll()

    if(!data){
        throw new AppError('There is no data found', HttpStatus.NOT_FOUND)
    }

    return data


}