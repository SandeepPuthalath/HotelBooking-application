import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { getUserProfile } from "../../application/user-cases/user/read";
import { HttpStatus } from "../../types/httpStatus";
import {
  changeUserRole,
  updateUserProfile,
} from "../../application/user-cases/user/update";

const userController = (
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());

  const handleGetUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
      const userId: any = req.params.userId;
      const data = await getUserProfile(userId, dbRepositoryUser);
      res.status(HttpStatus.OK).json({
        status: "success",
        message: "User Details has been feteched",
        data,
      });
    }
  );

  const HandleChangeUserRole = asyncHandler(
    async (req: Request, res: Response) => {
      const userId: any = req.params.userId;
      const data = await changeUserRole(userId, dbRepositoryUser);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "User role has been updated",
        data,
      });
    }
  );

  const handleUpdateUserProfile = asyncHandler(
    async (req: Request, res: Response) => {
      const userId: any | null = req.params.userId;
      const updates: any | null = req.body;

      const data = await updateUserProfile(userId, updates, dbRepositoryUser);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "User profile has been updated",
        data,
      });
    }
  );

 
  return {
    HandleChangeUserRole,
    handleGetUserProfile,
    handleUpdateUserProfile,
  };
};

export default userController;
