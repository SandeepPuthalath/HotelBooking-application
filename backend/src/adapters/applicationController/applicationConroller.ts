import { applicationDbInterface } from "../../application/repositories/applicationRepository";
import createApplication from "../../application/user-cases/application/createApplication";
import { applicationRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/applicationRespositoryDb";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appError";

export default function applicationController(
  applicationDbRepository: applicationDbInterface,
  applicationDbRepositryImpl: applicationRepositoryDbInterface
) {
  const dbRepository = applicationDbRepository(applicationDbRepositryImpl());

  const createRoleChangeApplication = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      applicantId,
      name,
      GSTNumber,
    }: {
      applicantId: string;
      name: string;
      GSTNumber: string;
    } = req.body;
    console.log(applicantId, name, GSTNumber);

    createApplication(applicantId, name, GSTNumber, dbRepository).then(
      (application: any) => {
        res
          .status(HttpStatus.OK)
          .json({
            status: "success",
            message: "Application has been submitted",
            application,
          });
      }
    ).catch((error: AppError) =>{
        console.log(error)
    })
  };

  return {
    createRoleChangeApplication,
  };
}
