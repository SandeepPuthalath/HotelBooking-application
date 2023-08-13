import application from "../../../entities/application";
import { UserRepositoryMongoDB } from "../../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";
import { applicationDbInterface } from "../../repositories/applicationRepository";

export default async function approveApplication(
  applicationId: string,
  applicationRepo: ReturnType<applicationDbInterface>,
  userRepo: ReturnType<UserRepositoryMongoDB>
) {
  if (!applicationId) {
    throw new AppError("Bad Request", HttpStatus.UNAUTHORIZED);
  }
  const applicantion : any = await applicationRepo.fetchApplication(applicationId);

  const { applicantId, GSTNumber } = applicantion;

  const data = await userRepo.changeUserRole(applicantId, GSTNumber);

  if(!data){
    throw new AppError("Somthing went wrong", HttpStatus.BAD_REQUEST);
  }

  await applicationRepo.changeStatus(applicationId);

  return data;
}
