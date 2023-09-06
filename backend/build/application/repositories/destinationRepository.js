"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function destinationRespository(repository) {
    const addDestination = async (destinationEntity) => await repository.addDestination(destinationEntity);
    const getAllDestinations = async () => await repository.getAllDestinations();
    const getFeaturedDestinations = async (count) => await repository.getFeaturedDestinations(count);
    const isDestinationNameExists = async (name) => await repository.isDestinationNameExists(name);
    return {
        addDestination,
        getAllDestinations,
        getFeaturedDestinations,
        isDestinationNameExists,
    };
}
exports.default = destinationRespository;
