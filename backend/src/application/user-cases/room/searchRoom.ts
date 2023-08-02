import { RoomsRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";

export default async function searchRoom(
  search:{
    checkInDate: string;
    checkOutDate: string;
  },
  roomRep: ReturnType<RoomsRepositoryDbInterface>
) {

    const {checkInDate, checkOutDate} = search;

    if(!checkInDate || !checkOutDate){
        throw new AppError("Bad Request", HttpStatus.BAD_REQUEST);
    }

    const data = await roomRep.searchRooms(checkInDate, checkOutDate);

    return data

}
