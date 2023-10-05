"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function paymentServicesInterface(service) {
    const generateStripePaymentUrl = async (bookingId, roomName, totalAmount) => await service.generateStripePaymentUrl(bookingId, roomName, totalAmount);
    return {
        generateStripePaymentUrl,
    };
}
exports.default = paymentServicesInterface;
