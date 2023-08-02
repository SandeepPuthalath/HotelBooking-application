export default function booking(
  name: string,
  phoneNumber: number,
  email: string,
  address: string,
  roomId: string,
  hotelId: string,
  userId: string,
  maxPeople: number,
  checkInDate: string,
  checkOutDate: string,
) {
  return {
    getName: (): string => name,
    getPhoneNumber: (): number => phoneNumber,
    getEmail: (): string => email,
    getAddress: (): string => address,
    getHotelId: ():string => hotelId,
    getUserId: () : string => userId,
    getRoomId: (): string => roomId,
    getMaxPeople: (): number => maxPeople,
    checkInDate: (): string => checkInDate,
    checkOutDate: ():string => checkOutDate,
  };
}

export type BookingEntityInterface = ReturnType<typeof booking>;
