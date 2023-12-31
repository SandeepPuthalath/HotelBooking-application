import { ObjectId } from "mongoose";
// import { GoogleUserInteface } from "../../../../types/googleUserInterface";
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
      password: user.getPassword(),
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

  const getUserById = async (id: string) => await User.findById(id);

  const updateUserByProperty = async (id: string, updates: any) => {
    const user: CreateUserInterface | null = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    return user;
  };

  const changeProfileImg = async (id: string, url: string) =>
    await User.findByIdAndUpdate(
      id,
      { $set: { pic: url } },
      { upsert: true, new: true }
    );

  const getAllUsers = async () => await User.find();

  const changeUserRole = async (id: string, GSTNumber: string) => {
    const data = await User.findByIdAndUpdate(
      id,
      { $set: { role: "business", GSTNumber: GSTNumber } },
      { new: true }
    );

    return data;
  };

  const countUsers = async () => await User.countDocuments();

  const fetchNewUsers = async () => await User.find().sort({createdAt: -1}).limit(4);

  return {
    getUserByEmail,
    addUser,
    getUserByPhoneNumber,
    getUserById,
    updateUserByProperty,
    getAllUsers,
    changeUserRole,
    changeProfileImg,
    countUsers,
    fetchNewUsers,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
