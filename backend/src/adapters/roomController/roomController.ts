import expressAsyncHandler from "express-async-handler";
import { RoomRepositoryInterface } from "../../application/repositories/roomRepository";
import { RoomsRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/roomsRepositoryDb";
import { Response, Request } from "express";
import { NextFunction } from "express";
import addRoom from "../../application/user-cases/room/addRoom";
import { HttpStatus } from "../../types/httpStatus";
import { hotelRepositoryInterface } from "../../application/repositories/hotelRepository";
import { hotelRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import getAllRoooms from "../../application/user-cases/room/getAllRooms";
import getRoomDetails from "../../application/user-cases/room/getRoomDetails";
import addImage from "../../application/user-cases/room/addImage";
import searchRoom from "../../application/user-cases/room/searchRoom";

export default function roomController(
  roomRepository: RoomRepositoryInterface,
  roomRepositoryDbImpl: RoomsRepositoryDbInterface,
  hotelRepository: hotelRepositoryInterface,
  hotelRepositoryDbImpl: hotelRepositoryDbInterface
) {
  const repositoryRoom = roomRepository(roomRepositoryDbImpl());
  const repositoryHotel = hotelRepository(hotelRepositoryDbImpl());

  const handleAddRoom = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const roomData = req.body;

      const hotelId = req.params?.hotelId;
      const data: any = await addRoom(
        hotelId,
        roomData,
        repositoryRoom,
        repositoryHotel
      );
      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Room has been added successfully",
        data: data,
      });
    }
  );

  const handleGetAllRooms = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const hotelId = req.params?.hotelId;

      const data = await getAllRoooms(hotelId, repositoryRoom, repositoryHotel);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Rooms details has been successfull",
        data: data,
      });
    }
  );

  const handleGetRoomDetails = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { hotelId, roomId } = req.params;
      const data = await getRoomDetails(
        hotelId,
        roomId,
        repositoryHotel,
        repositoryRoom
      );

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Room details fetch successfully",
        data: data,
      });
    }
  );

  const handleAddRoomImage = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { hotelId, roomId } = req.params;
      const { imgId } = req.body;

      const data = await addImage(
        hotelId,
        roomId,
        imgId,
        repositoryHotel,
        repositoryRoom
      );

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Image added successfully",
        data: data,
      });
    }
  );

  const handleSearchRoom = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const search = req.body;

      const data = await searchRoom(search, repositoryRoom);

      console.log(data);

      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "search result has been fetched",
          data: data,
        });
    }
  );

  return {
    handleAddRoom,
    handleGetAllRooms,
    handleGetRoomDetails,
    handleAddRoomImage,
    handleSearchRoom,
  };
}
