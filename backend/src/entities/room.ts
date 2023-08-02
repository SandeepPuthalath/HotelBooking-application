export default function room(
  hotelId: string,
  title: string,
  price: number,
  type: string,
  maxPeople: number,
  desc: string,
  photos: string,
) {
  return {
    getTitile:(): string => title,
    getPrice: () : number => price,
    getDesc: (): string => desc,
    getMaxPeople: (): number => maxPeople,
    getPhotos: () :string => photos,
    getHotelId: ():string => hotelId,
    getType: (): string => type,
  };
}


export type RoomInterface = ReturnType<typeof room>