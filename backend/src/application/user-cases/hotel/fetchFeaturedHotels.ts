import { hotelRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";





export default async function fetchFeaturedHotels(
    repository: ReturnType<hotelRepositoryDbInterface>
){
    const featured = await repository.featuredHotels();

    console.log(featured);

    return featured;

}