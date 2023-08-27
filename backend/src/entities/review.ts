import mongoose from "mongoose";

export default function review(
  hotelId: string | mongoose.Schema.Types.ObjectId,
  userId: string | mongoose.Schema.Types.ObjectId,
  star: number,
  message: string
) {
  return {
    getHotelId: (): string | mongoose.Schema.Types.ObjectId => hotelId,
    getUserId: (): string | mongoose.Schema.Types.ObjectId => userId,
    getStar: (): number => star,
    getMessage: (): string => message,
  };
}


export type ReviewEntityType = ReturnType<typeof review>
