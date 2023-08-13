import { DestinationEntityType } from "../../entities/destination";
import { DestinationRespositoryDbType } from "../../frameworks/database/mongoDB/repositories/destinationRespositoryDb";

export default function destinationRespository(
  repository: ReturnType<DestinationRespositoryDbType>
) {
  const addDestination = async (
    destinationEntity: DestinationEntityType,
  ) => await repository.addDestination(destinationEntity);

  const getAllDestinations = async () => await repository.getAllDestinations();

  const getFeaturedDestinations = async (count: number) => await repository.getFeaturedDestinations(count);


  return {
    addDestination,
    getAllDestinations,
    getFeaturedDestinations,
  }
}

export type DestinationRepositoryInterface = typeof destinationRespository
