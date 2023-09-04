import destination from "../../../entities/destination";
import { DestinationRespositoryDbType } from "../../../frameworks/database/mongoDB/repositories/destinationRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";





export default async function addDestination(name: string, photo: string, destinationResp: ReturnType<DestinationRespositoryDbType>){

    if(!name || !photo){
        throw new AppError("Some details are missing", HttpStatus.BAD_REQUEST);
    }

    const isExists = await destinationResp.isDestinationNameExists(name);

    console.log(isExists)

    if(isExists){
        throw new AppError("The destination already exists", HttpStatus.CONFLICT);
    }

    const newDestination = destination(name, photo);

    const data = await destinationResp.addDestination(newDestination);

    return data;
}