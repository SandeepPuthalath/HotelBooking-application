"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const stripe = require("stripe")(config_1.default.STRIPE_PRIVET_KEY);
function paymentServices() {
    const generateStripePaymentUrl = async (bookingId, roomName, totalAmount) => {
        // console.log("got to payment service....",bookingId, roomName, totalAmount)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: roomName,
                        },
                        unit_amount: totalAmount,
                    },
                    quantity: 1,
                },
            ],
            success_url: `${config_1.default.CLIENT_URL}/success/${bookingId}`,
            cancel_url: `${config_1.default.CLIENT_URL}/cancel`,
        });
        return session;
    };
    return {
        generateStripePaymentUrl,
    };
}
exports.default = paymentServices;
