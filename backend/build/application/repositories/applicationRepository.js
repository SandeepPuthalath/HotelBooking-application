"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applicationRepository(repository) {
    const create = async (application) => await repository.create(application);
    const fetchAll = async () => await repository.fetchAll();
    const fetchApplication = async (applicationId) => await repository.fetchApplication(applicationId);
    const changeStatus = async (applicationId) => await repository.changeStatus(applicationId);
    return {
        create,
        fetchAll,
        fetchApplication,
        changeStatus,
    };
}
exports.default = applicationRepository;
