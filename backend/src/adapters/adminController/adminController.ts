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

export default function adminController(
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) {
  const userRespository = userDbRepository(userDbRepositoryImpl());

  const handleGetAllUsers = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log("got to admin user fetching api");

      const data = await getAllUsers(userRespository);

      res
        .status(HttpStatus.OK)
        .json({
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
      
      res
        .status(HttpStatus.OK)
        .json({
          status: "success",
          message: "user details has been fetched",
          data: data,
        });
    }
  );

  return {
    handleGetAllUsers,
    handleGetUserDetails,
  };
}
