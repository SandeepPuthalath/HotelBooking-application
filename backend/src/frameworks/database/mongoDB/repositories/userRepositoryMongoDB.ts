import { ObjectId } from "mongoose";
import { GoogleUserInteface } from "../../../../types/googleUserInterface";
import { CreateUserInterface } from "../../../../types/userInterface";
import User from "../models/userModel";
import { UserEntityType } from "../../../../entities/user";

export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: CreateUserInterface | null = await User.findOne({ email });
    return user;
  };

  //add user

  const addUser = async (user: UserEntityType) => {
    const newUser: any = new User({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword()
    });
    newUser.save();
    return newUser;
  };

  // getting user by phone number

  const getUserByPhoneNumber = async (phoneNumber: number) => {
    const user: CreateUserInterface | null = await User.findOne({
      phoneNumber,
    });

    return user;
  };

  const getUserById = async (id: ObjectId) => await User.findById(id);

  const updateUserByProperty = async (id: ObjectId, updates:any) =>{
    const user: CreateUserInterface | null= await User.findByIdAndUpdate(id, updates, {new: true})
    return user
  }

  const getAllUsers = async () => await User.find();

  return {
    getUserByEmail,
    addUser,
    getUserByPhoneNumber,
    getUserById,
    updateUserByProperty,
    getAllUsers
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
