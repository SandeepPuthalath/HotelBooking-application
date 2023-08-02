import application from "../../../entities/application";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utils/appError";


export default function createApplication(applicantId:string, name: string, GSTNumber:string, applicationRepository:any){

    if(!applicantId || ! GSTNumber){
        throw new AppError('pleace provide a valid informations', HttpStatus.NOT_FOUND)
    }

    const newApplication = application(applicantId, name, GSTNumber);

    return applicationRepository.create(newApplication)

}