import destination from "../../../entities/destination";
import { DestinationRespositoryDbType } from "../../../frameworks/database/mongoDB/repositories/destinationRespositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";





export default async function fetchAllDestinations(destinationResp: ReturnType<DestinationRespositoryDbType>){

    const data = await destinationResp.getAllDestinations();

    return data;
}