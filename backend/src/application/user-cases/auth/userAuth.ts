import { HttpStatus } from "../../../types/httpStatus";
import { CreateUserInterface } from "../../../types/userInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";

import { ObjectId, Types } from "mongoose";
import createUserEntity, { UserEntityType } from "../../../entities/user";
import { removePasswordField } from "../user/read";

export const userRegister = async (
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user?.email.toLowerCase();
  const isExistingEmail = await userRepository.getUserByEmail(user?.email);
  if (isExistingEmail) {
    throw new AppError("This email already register with an account", HttpStatus.UNAUTHORIZED);
  }

  user.password = await authService.encryptPassword(user?.password);
  const {firstName, lastName, email, phoneNumber, password} = user
  const userEntity : UserEntityType = createUserEntity(firstName, lastName, email, phoneNumber, password);

  console.log(userEntity.getLastName())

  const createdUser: any = await userRepository.addUser(userEntity);

  const applicantId: Types.ObjectId = createdUser?._id;

  const token = authService.generateToken(createdUser?._id.toString());
  return { token, applicantId };
};

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const user: CreateUserInterface | null = await userRepository.getUserByEmail(
    email
  );
  const applicantId = user?._id;

  const userDetails = removePasswordField(user)

  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED);
  }
  const isPasswordCorrect = await authService.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new AppError(
      "Sorry, your password was incorrect. Please double-check your password",
      HttpStatus.UNAUTHORIZED
    );
  }
  const token = authService.generateToken(JSON.stringify(userDetails));
  return { token, applicantId };
};

// export const googleUserLogin = async (
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//   },
//   userRepository: ReturnType<UserDbInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   const isExistingEmail = await userRepository.getUserByEmail(user.email);
//   if (isExistingEmail) {
//     const token = authService.generateToken(isExistingEmail._id.toString());

//     return token;
//   } else {
//     const createdUser = await userRepository.addUser(user);
//     const applicantId = createdUser._id;
//     const token: string = authService.generateToken(createdUser._id.toString());

//     return { token, applicantId };
//   }
// };

export const sendOTP = async (
  phoneNumber: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  if (!phoneNumber) {
    throw new AppError(
      "Phone number field cannot be empty",
      HttpStatus.UNAUTHORIZED
    );
  }

  const user: CreateUserInterface | null =
    await userRepository.getUserByPhoneNumber(parseInt(phoneNumber));

  if (!user) {
    throw new AppError(
      "Sorry, There is no Account linked with this phone number",
      HttpStatus.UNAUTHORIZED
    );
  }
  return await authService.generateOTP(phoneNumber);
};

export const verifyOTP = async (
  phoneNumber: string,
  otp: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  if (!otp) {
    throw new AppError("Please provide a valid OTP", HttpStatus.UNAUTHORIZED);
  }

  const verification = await authService.verifyOTP(phoneNumber, otp);

  if (!verification) {
    throw new AppError(
      "OTP does not match, Please provide a valid OTP",
      HttpStatus.UNAUTHORIZED
    );
  }

  const user: CreateUserInterface | null =
    await userRepository.getUserByPhoneNumber(parseInt(phoneNumber));
  const applicantId = user?._id;
  if (!user) {
    throw new AppError("this user doesn't exist", HttpStatus.UNAUTHORIZED);
  }

  const token = authService.generateToken(user._id.toString());
  return { token, applicantId };
};
