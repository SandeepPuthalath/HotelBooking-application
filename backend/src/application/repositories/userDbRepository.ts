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

  const getUserById = async (id: ObjectId) => await repository.getUserById(id)

  const updateUserByProperty =async (id:ObjectId, update: object) => await repository.updateUserByProperty(id, update)

  const getAllUsers = async () => repository.getAllUsers()

  return {
    getUserByEmail,
    addUser,
    getUserByPhoneNumber,
    getUserById,
    updateUserByProperty,
    getAllUsers
  };
};

export type UserDbInterface = typeof userDbRepository;
