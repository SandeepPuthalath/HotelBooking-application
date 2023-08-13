import { ApplicationEntityInterface } from "../../entities/application";
import { ApplicationRepositoryDbInterface } from "../../frameworks/database/mongoDB/repositories/applicationRespositoryDb";

export default function applicationRepository (repository:ReturnType<ApplicationRepositoryDbInterface>){

    const create = async (application: ReturnType<ApplicationEntityInterface>) => await repository.create(application);

    const fetchAll = async () => await repository.fetchAll();

    const fetchApplication = async (applicationId: string) => await repository.fetchApplication(applicationId);

    const changeStatus = async (applicationId: string) => await repository.changeStatus(applicationId);

    return {
        create,
        fetchAll,
        fetchApplication,
        changeStatus,
    }
}

export type applicationDbInterface = typeof applicationRepository