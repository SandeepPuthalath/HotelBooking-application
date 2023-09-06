"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllApplications = void 0;
async function getAllApplications(repository) {
    const data = await repository.fetchAll();
    return data;
}
exports.getAllApplications = getAllApplications;
