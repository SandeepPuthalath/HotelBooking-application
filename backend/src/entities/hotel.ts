export default function hotel(
  name: string,
  type: string,
  address: string,
  distance: string,
  desc: string,
  cheapestPrice: number,
  userId: string,
  photos: string
) {
  return {
    name: (): string => name,
    type: (): string => type,
    address: (): string => address,
    distance: (): string => distance,
    desc: (): string => desc,
    cheapestPrice: (): number => cheapestPrice,
    userId: (): string => userId,
    photos: (): string => photos
  };
}

export type HotelEntityInterface = ReturnType<typeof hotel>;
