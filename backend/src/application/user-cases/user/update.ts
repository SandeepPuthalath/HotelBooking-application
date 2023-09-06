import { ObjectId } from "mongoose";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { UserDbInterface } from "../../repositories/userDbRepository";
import { removePasswordField } from "./read";

export const updateUserProfile = async (
  id: string,
  updates: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phoneNumber: string;
  },
  userRepository: ReturnType<UserDbInterface>
) => {
  if (!updates) {
    throw new AppError(
      "please provide something to update",
      HttpStatus.NOT_FOUND
    );
  }

  const user = await userRepository.updateUserByProperty(id, updates);
  const data = removePasswordField(user);

  if (!data) {
    throw new AppError("User Dose not exist", HttpStatus.UNAUTHORIZED);
  }

  return data;
};

export const changeUserRole = async (
  id: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  if (!id) {
    throw new AppError(
      "Somthing went wrong please log in again",
      HttpStatus.UNAUTHORIZED
    );
  }

  const data = await userRepository.getUserById(id);

  if (!data) {
    throw new AppError("User Dose not exist", HttpStatus.UNAUTHORIZED);
  }

  data?.role === "normal" ? (data.role = "business") : (data.role = "normal");
  await data.save();

  const user = removePasswordField(data);

  return user;
};


export const updateProfileImg = async (id:string, url: string, repository:ReturnType<UserDbInterface>) =>{

  if(!id || !url){
    throw new AppError("Somthing went wrong", HttpStatus.BAD_REQUEST);
  }

  return await repository.changeProfileImg(id, url);

}

