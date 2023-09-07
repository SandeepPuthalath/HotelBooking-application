import { ObjectId } from "mongoose";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { GoogleUserInteface } from "../../types/googleUserInterface";
import { CreateUserInterface, UserInterface } from "../../types/userInterface";
import { UserEntityType } from "../../entities/user";

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongoDB>
) => {
  const getUserByEmail = async (email: string) =>
    await repository.getUserByEmail(email);

  const addUser = async (user: UserEntityType) =>
    await repository.addUser(user);

  const getUserByPhoneNumber = async (phoneNumber: number) =>  await repository.getUserByPhoneNumber(phoneNumber);

  const getUserById = async (id: string) => await repository.getUserById(id)

  const updateUserByProperty =async (id:string, update: object) => await repository.updateUserByProperty(id, update)

  const getAllUsers = async () => repository.getAllUsers();

  const changeUserRole = async (id: string, GSTNumber: string) => await repository.changeUserRole(id, GSTNumber);

  const changeProfileImg = async (id:string, url: string) => await repository.changeProfileImg(id, url);

  const countUsers = async () => await repository.countUsers();

   const fetchNewUsers = async () => await repository.fetchNewUsers();

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

export type UserDbInterface = typeof userDbRepository;
