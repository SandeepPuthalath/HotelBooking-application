export default function destination(name: string, photo: string) {
  return {
    getName: (): string => name,
    getPhoto: (): string => photo,
  };
}


export type DestinationEntityType = ReturnType<typeof destination>