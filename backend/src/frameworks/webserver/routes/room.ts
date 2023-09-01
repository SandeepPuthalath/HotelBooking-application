import express from "express";
import roomController from "../../../adapters/roomController/roomController";
import roomRepository from "../../../application/repositories/roomRepository";
import roomsRepositoryDb from "../../database/mongoDB/repositories/roomsRepositoryDb";
import hotelRepository from "../../../application/repositories/hotelRepository";
import hotelRepositoryDb from "../../database/mongoDB/repositories/hotelRespositoryDb";

export default function roomRouter() {
  const router = express.Router();

  const controller = roomController(
    roomRepository,
    roomsRepositoryDb,
    hotelRepository,
    hotelRepositoryDb
  );

  router.post("/:hotelId", controller.handleAddRoom);
  router.get("/:hotelId", controller.handleGetAllRooms);
  router.route("/:id").put(controller.handleUpdateRoomDetails);
  router.get("/details/:hotelId/:roomId", controller.handleGetRoomDetails);
  router.post("/add/img/:hotelId/:roomId", controller.handleAddRoomImage);
  router.post("/", controller.handleSearchRoom);

  return router;
}
