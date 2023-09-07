import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/appError";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import expressAsyncHandler from "express-async-handler";
import {
  getAllUsers,
  getUserProfile,
} from "../../application/user-cases/user/read";
import { HttpStatus } from "../../types/httpStatus";
import mongoose from "mongoose";
import { BookingRepository } from "../../application/repositories/BookingRepository";
import { BookingRepositoryDbType } from "../../frameworks/database/mongoDB/repositories/BookingRepositoryDb";
import { hotelRepositoryInterface } from "../../application/repositories/hotelRepository";
import { hotelRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/hotelRespositoryDb";
import fetchDashboardDetails from "../../application/user-cases/admin/fetchDashboardDetails";

export default function adminController(
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB,
  bookingRepoInt: BookingRepository,
  bookingRepoImpl: BookingRepositoryDbType,
  hotelRepoInt: hotelRepositoryInterface,
  hotelRepoImpl: hotelRepositoryDbInterface
) {
  const userRespository = userDbRepository(userDbRepositoryImpl());
  const bookingRepository = bookingRepoInt(bookingRepoImpl());
  const hotelRepository = hotelRepoInt(hotelRepoImpl());

  const handleGetAllUsers = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("got to admin user fetching api");

      const data = await getAllUsers(userRespository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "All users details has been fetched",
        data: data,
      });
    }
  );

  const handleGetUserDetails = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId: any = req.params?.userId;

      const data = await getUserProfile(userId, userRespository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "user details has been fetched",
        data: data,
      });
    }
  );

  const handleFetchingDashboardDatas = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await fetchDashboardDetails(
        userRespository,
        bookingRepository,
        hotelRepository
      );

      res.status(HttpStatus.OK).json(data);
    }
  );

  return {
    handleGetAllUsers,
    handleGetUserDetails,
    handleFetchingDashboardDatas,
  };
}
