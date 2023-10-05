import configKeys from "../../config";

const stripe = require("stripe")(configKeys.STRIPE_PRIVET_KEY);

export default function paymentServices() {
  const generateStripePaymentUrl = async (
    bookingId: string,
    roomName: string,
    totalAmount: number
  ) => {
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
      success_url: `${configKeys.CLIENT_URL}/success/${bookingId}`,
      cancel_url: `${configKeys.CLIENT_URL}/cancel`,
    });

    return session;
  };

  return {
    generateStripePaymentUrl,
  };
}

export type PaymentServicesType = typeof paymentServices;
