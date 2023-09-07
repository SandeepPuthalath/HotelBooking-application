import express from "express";
import adminController from "../../../adapters/adminController/adminController";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";
import bookingRepository from "../../../application/repositories/BookingRepository";
import bookingRepositoryDb from "../../database/mongoDB/repositories/BookingRepositoryDb";
import hotelRepository from "../../../application/repositories/hotelRepository";
import hotelRepositoryDb from "../../database/mongoDB/repositories/hotelRespositoryDb";

export default function adminRoute() {
  const router = express.Router();

  const controller = adminController(
    userDbRepository,
    userRepositoryMongoDB,
    bookingRepository,
    bookingRepositoryDb,
    hotelRepository,
    hotelRepositoryDb
  );

  router.route("/").get(controller.handleFetchingDashboardDatas);

  router.route("/users").get(controller.handleGetAllUsers);

  router.get("/user/:userId", controller.handleGetUserDetails);

  return router;
}
