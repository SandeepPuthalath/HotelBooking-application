import { createApplicationInterface } from "../../types/applicationInterface";

export default function applicationRepository (repository: any){
    const create = async (application: createApplicationInterface) => await repository.create(application)
    return {
        create
    }
}

export type applicationDbInterface = typeof applicationRepository