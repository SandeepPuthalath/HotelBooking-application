import { DestinationRespositoryDbType } from "../../../frameworks/database/mongoDB/repositories/destinationRespositoryDb";



export default async function fetchFeatured(count: number, respository: ReturnType<DestinationRespositoryDbType>){

    const data = await respository.getFeaturedDestinations(count);

    return data
}