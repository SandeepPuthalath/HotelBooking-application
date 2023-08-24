import { PaymentServicesType } from "../../frameworks/services/paymentServices";

export default function paymentServicesInterface(
  service: ReturnType<PaymentServicesType>
) {
  const generateStripePaymentUrl = async (
    bookingId: string,
    roomName: string,
    totalAmount: number
  ) => await service.generateStripePaymentUrl(bookingId, roomName, totalAmount);

  return {
    generateStripePaymentUrl,
  };
}

export type PaymentServiceInterface = typeof paymentServicesInterface;
