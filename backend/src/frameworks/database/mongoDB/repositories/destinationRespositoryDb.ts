import { DestinationEntityType } from "../../../../entities/destination";
import Destination from "../models/destinationModel";

export default function destinationRespositoryDb() {
  const addDestination = async (destinationEntity: DestinationEntityType) => {
    const destination = new Destination({
      name: destinationEntity.getName(),
      photo: destinationEntity.getPhoto(),
    });

    destination.save();
    return destination;
  };

  const getAllDestinations = async () => await Destination.find();

  const isDestinationNameExists = async (name: string) => {
    const destinations = await Destination.find();
    return destinations.find(destination => destination?.name?.toLowerCase() === name.toLowerCase())
  };

  const getFeaturedDestinations = async (count: number) =>
    await Destination.find({ featured: true }).limit(count);

  return {
    addDestination,
    getAllDestinations,
    getFeaturedDestinations,
    isDestinationNameExists,
  };
}

export type DestinationRespositoryDbType = typeof destinationRespositoryDb;
