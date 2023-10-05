"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function room(hotelId, title, price, maxPeople, desc, photos) {
    return {
        getTitile: () => title,
        getPrice: () => price,
        getDesc: () => desc,
        getMaxPeople: () => maxPeople,
        getPhotos: () => photos,
        getHotelId: () => hotelId,
    };
}
exports.default = room;
