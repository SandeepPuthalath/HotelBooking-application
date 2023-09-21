import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";




export default async function viewByDestination(destination: string, repository: ReturnType<hotelRepositoryDbInterface>){
    
    const data = await repository.findByDestination(destination);

    return data;

}