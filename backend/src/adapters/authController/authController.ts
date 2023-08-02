import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { UserDbInterface } from "../../application/repositories/userDbRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { AuthService } from "../../frameworks/services/authService";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { CreateUserInterface, UserInterface } from "../../types/userInterface";

import {
  userRegister,
  userLogin,
  sendOTP,
  verifyOTP,
} from "../../application/user-cases/auth/userAuth";
// import { Types } from 'mongoose';

const authController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const user: UserInterface = req.body;

    
    const { token, applicantId } = await userRegister(
      user,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "User has been registered succesfully",
      token,
      applicantId,
    });
  });

  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    const {token, applicantId} = await userLogin(
      email,
      password,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
      applicantId
    });
  });

  const sendOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;

    const otpStatus = await sendOTP(phoneNumber, dbRepositoryUser, authService);

    res.json({ status: "success", message: "otp has been send", otpStatus });
  });

  const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const { phoneNumber, otp } = req.body;

    const {token, applicantId} = await verifyOTP(
      phoneNumber,
      otp,
      dbRepositoryUser,
      authService
    );
    res.json({
      status: "success",
      message: "user verified",
      token,
      applicantId
    });
  });

  return {
    registerUser,
    loginUser,
    sendOtp,
    verifyOtp,
  };
};

export default authController;
