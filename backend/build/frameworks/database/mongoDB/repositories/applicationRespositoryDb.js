"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(require("../models/Application"));
function applicationRepositoryDb() {
    const create = async (applicationEntity) => {
        const newApplication = new Application_1.default({
            name: applicationEntity.getName(),
            applicantId: applicationEntity.getApplicantId(),
            GSTNumber: applicationEntity.getGSTNumber(),
        });
        return newApplication.save();
    };
    const fetchAll = async () => await Application_1.default.find();
    const fetchApplication = async (applicationId) => await Application_1.default.findById(applicationId);
    const changeStatus = async (id) => await Application_1.default.updateOne({ _id: id }, { $set: { status: "approved" } });
    return {
        create,
        fetchAll,
        fetchApplication,
        changeStatus,
    };
}
exports.default = applicationRepositoryDb;
