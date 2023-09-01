export default function room(
  hotelId: string,
  title: string,
  price: number,
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
  };
}


export type RoomInterface = ReturnType<typeof room>