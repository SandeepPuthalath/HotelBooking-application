export default function hotel(
  name: string,
  address: string,
  destination: string,
  distance: string,
  desc: string,
  cheapestPrice: number,
  userId: string,
  photos: string
) {
  return {
    name: (): string => name,
    address: (): string => address,
    destination: (): string => destination,
    distance: (): string => distance,
    desc: (): string => desc, 
    cheapestPrice: (): number => cheapestPrice,
    userId: (): string => userId,
    photos: (): string => photos
  };
}

export type HotelEntityInterface = ReturnType<typeof hotel>;
