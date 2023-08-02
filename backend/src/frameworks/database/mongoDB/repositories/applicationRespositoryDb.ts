import { applicationEntityInterface } from "../../../../entities/application";
import { createApplicationInterface } from "../../../../types/applicationInterface";
import Application from "../models/Application";



export default function applicationRepositoryDb(){

    const create = async (applicationEntity:any) => {
        const newApplication = new Application({
            applicantId: applicationEntity.getApplicantId(),
            GSTNumber: applicationEntity.getGst()
        })

        return newApplication.save()
    } 

    return {
        create
    }

}

export type applicationRepositoryDbInterface = typeof applicationRepositoryDb