"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function booking(name, phoneNumber, email, address, roomId, hotelId, userId, maxPeople, checkInDate, checkOutDate, totalDays, price) {
    return {
        getName: () => name,
        getPhoneNumber: () => phoneNumber,
        getEmail: () => email,
        getAddress: () => address,
        getHotelId: () => hotelId,
        getUserId: () => userId,
        getRoomId: () => roomId,
        getMaxPeople: () => maxPeople,
        checkInDate: () => checkInDate,
        checkOutDate: () => checkOutDate,
        getTotalDays: () => totalDays,
        getPrice: () => price
    };
}
exports.default = booking;
