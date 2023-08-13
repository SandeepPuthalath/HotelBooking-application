import { applicationDbInterface } from "../../application/repositories/applicationRepository";
import createApplication from "../../application/user-cases/application/createApplication";
import { ApplicationRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/applicationRespositoryDb";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";
import expressAsyncHandler from "express-async-handler";
import { getAllApplications } from "../../application/user-cases/application/getAllApplications";
import approveApplication from "../../application/user-cases/application/approveApplication";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import { UserDbInterface } from "../../application/repositories/userDbRepository";

export default function applicationController(
  applicationDbRepository: applicationDbInterface,
  applicationDbRepositryImpl: ApplicationRepositoryDbInterface,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongoDB
) {
  const dbRepository = applicationDbRepository(applicationDbRepositryImpl());
  const userReposiory =  userDbRepository(userDbRepositoryImpl())

  const createRoleChangeApplication = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        applicantId,
        name,
        GSTNumber,
      }: {
        applicantId: string;
        name: string;
        GSTNumber: string;
      } = req.body;

      createApplication(applicantId, name, GSTNumber, dbRepository)
        .then((application: any) => {
          res.status(HttpStatus.OK).json({
            status: "success",
            message: "Application has been submitted",
            application,
          });
        })
        .catch((error: AppError) => {
          console.log(error);
        });
    }
  );

  const handlefetchAllApplications = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      
      const data = await getAllApplications(dbRepository);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "Applications has been fetched successfully",
        data: data,
      });
    }
  );

  const handleRoleChangeApproving = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

      const applicationId = req.params.applicationId;

      console.log(applicationId)

      const data = await approveApplication(applicationId, dbRepository, userReposiory);

      res.status(HttpStatus.OK).json({
        status: "success",
        message: "User has been approved to become Business user",
        data: data,
      });
    }
  );

  return {
    createRoleChangeApplication,
    handlefetchAllApplications,
    handleRoleChangeApproving,
  };
}
