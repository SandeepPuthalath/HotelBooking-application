import mongoose from "mongoose";

export default function booking(
  name: string,
  phoneNumber: number,
  email: string,
  address: string,
  roomId: mongoose.Types.ObjectId,
  hotelId:  mongoose.Types.ObjectId,
  userId:  mongoose.Types.ObjectId,
  maxPeople: number,
  checkInDate: string,
  checkOutDate: string,
  price: number,
) {
  return {
    getName: (): string => name,
    getPhoneNumber: (): number => phoneNumber,
    getEmail: (): string => email,
    getAddress: (): string => address,
    getHotelId: (): mongoose.Types.ObjectId => hotelId,
    getUserId: () :  mongoose.Types.ObjectId => userId,
    getRoomId: ():  mongoose.Types.ObjectId => roomId,
    getMaxPeople: (): number => maxPeople,
    checkInDate: (): string => checkInDate,
    checkOutDate: ():string => checkOutDate,
    getPrice: (): number => price
  };
}

export type BookingEntityInterface = ReturnType<typeof booking>;
