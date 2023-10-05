"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const destinationModel_1 = __importDefault(require("../models/destinationModel"));
function destinationRespositoryDb() {
    const addDestination = async (destinationEntity) => {
        const destination = new destinationModel_1.default({
            name: destinationEntity.getName(),
            photo: destinationEntity.getPhoto(),
        });
        destination.save();
        return destination;
    };
    const getAllDestinations = async () => await destinationModel_1.default.find();
    const isDestinationNameExists = async (name) => {
        const destinations = await destinationModel_1.default.find();
        return destinations.find(destination => destination?.name?.toLowerCase() === name.toLowerCase());
    };
    const getFeaturedDestinations = async (count) => await destinationModel_1.default.find({ featured: true }).limit(count);
    return {
        addDestination,
        getAllDestinations,
        getFeaturedDestinations,
        isDestinationNameExists,
    };
}
exports.default = destinationRespositoryDb;
