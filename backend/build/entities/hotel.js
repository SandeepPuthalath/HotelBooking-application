"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hotel(name, address, destination, distance, desc, cheapestPrice, userId, photos) {
    return {
        name: () => name,
        address: () => address,
        destination: () => destination,
        distance: () => distance,
        desc: () => desc,
        cheapestPrice: () => cheapestPrice,
        userId: () => userId,
        photos: () => photos
    };
}
exports.default = hotel;
