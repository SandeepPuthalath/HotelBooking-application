"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function review(hotelId, userId, star, message) {
    return {
        getHotelId: () => hotelId,
        getUserId: () => userId,
        getStar: () => star,
        getMessage: () => message,
    };
}
exports.default = review;
