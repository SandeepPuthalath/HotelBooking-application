import { ApplicableRefactorInfo } from "typescript";
import { ApplicationEntityInterface } from "../../../../entities/application";
import { createApplicationInterface } from "../../../../types/applicationInterface";
import Application from "../models/Application";

export default function applicationRepositoryDb() {
  const create = async (
    applicationEntity: ReturnType<ApplicationEntityInterface>
  ) => {
    const newApplication = new Application({
      name: applicationEntity.getName(),
      applicantId: applicationEntity.getApplicantId(),
      GSTNumber: applicationEntity.getGSTNumber(),
    });

    return newApplication.save();
  };

  const fetchAll = async () => await Application.find({});

  const fetchApplication = async (applicationId: string) => await Application.findById(applicationId);

  const changeStatus = async (id: string) => await Application.updateOne({_id: id}, {$set:{status : "approved"}});

  return {
    create,
    fetchAll,
    fetchApplication,
    changeStatus,
  };
}

export type ApplicationRepositoryDbInterface = typeof applicationRepositoryDb;
