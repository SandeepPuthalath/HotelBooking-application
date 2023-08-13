import { ApplicationRepositoryDbInterface } from "../../../frameworks/database/mongoDB/repositories/applicationRespositoryDb";

export async function getAllApplications(
  repository: ReturnType<ApplicationRepositoryDbInterface>
) {
  const data = await repository.fetchAll();

  return data;
}
