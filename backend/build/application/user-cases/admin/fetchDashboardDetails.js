"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchDashboardDetails(userRepo, bookingRepo, hotelRepo) {
    const data = {};
    data.totalUsers = await userRepo.countUsers();
    data.newUsers = await userRepo.fetchNewUsers();
    data.totalBookings = await bookingRepo.countBookings();
    data.totalRevenu = await bookingRepo.adminRevenu();
    data.totalHotels = await hotelRepo.countHotels();
    return data;
}
exports.default = fetchDashboardDetails;
