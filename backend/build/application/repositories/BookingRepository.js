"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bookingRepository(repository) {
    const createBooking = async (bookingEntity) => await repository.createBooking(bookingEntity);
    const getAllBooking = async () => await repository.getAllBooking();
    const getBooking = async (bookingId) => await repository.getBooking(bookingId);
    const deleteBooking = async (bookingId) => await repository.deleteBooking(bookingId);
    const updateBooking = async (bookingId, updates) => await repository.updateBooking(bookingId, updates);
    const getAllBookingsOfUser = async (userId, page, limit) => await repository.getAllBookingsOfUser(userId, page, limit);
    const getAllBookingOfHotel = async (hotelId, page, limit) => await repository.getAllBookingOfHotel(hotelId, page, limit);
    const changeStatus = async (bookingId, status) => await repository.changeStatus(bookingId, status);
    const getMonthlyRevenu = async (hotelId) => await repository.getMonthlyRevenu(hotelId);
    const getYearlyRevenu = async (hotelId) => await repository.getYearlyRevenu(hotelId);
    const getTotalBookings = async (hotelId) => await repository.getTotalBookings(hotelId);
    const changePaymentStatus = async (id, paymentMethod) => await repository.changePaymentStatus(id, paymentMethod);
    const getBookingDetailsOfUser = async (id) => await repository.getBookingDetailsOfUser(id);
    const getWeeklyBookings = async (id) => await repository.getWeeklyBookings(id);
    const countBookings = async () => await repository.countBookings();
    const adminRevenu = async () => await repository.adminRevenu();
    return {
        createBooking,
        getAllBooking,
        getBooking,
        deleteBooking,
        updateBooking,
        getAllBookingsOfUser,
        getAllBookingOfHotel,
        changeStatus,
        getMonthlyRevenu,
        getYearlyRevenu,
        getTotalBookings,
        changePaymentStatus,
        getBookingDetailsOfUser,
        getWeeklyBookings,
        countBookings,
        adminRevenu,
    };
}
exports.default = bookingRepository;
