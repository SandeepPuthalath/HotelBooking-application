"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createApplication_1 = __importDefault(require("../../application/user-cases/application/createApplication"));
const httpStatus_1 = require("../../types/httpStatus");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const getAllApplications_1 = require("../../application/user-cases/application/getAllApplications");
const approveApplication_1 = __importDefault(require("../../application/user-cases/application/approveApplication"));
function applicationController(applicationDbRepository, applicationDbRepositryImpl, userDbRepository, userDbRepositoryImpl) {
    const dbRepository = applicationDbRepository(applicationDbRepositryImpl());
    const userReposiory = userDbRepository(userDbRepositoryImpl());
    const createRoleChangeApplication = (0, express_async_handler_1.default)(async (req, res, next) => {
        const { applicantId, name, GSTNumber, } = req.body;
        (0, createApplication_1.default)(applicantId, name, GSTNumber, dbRepository)
            .then((application) => {
            res.status(httpStatus_1.HttpStatus.OK).json({
                status: "success",
                message: "Application has been submitted",
                application,
            });
        })
            .catch((error) => {
            console.log(error);
        });
    });
    const handlefetchAllApplications = (0, express_async_handler_1.default)(async (req, res, next) => {
        const data = await (0, getAllApplications_1.getAllApplications)(dbRepository);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "Applications has been fetched successfully",
            data: data,
        });
    });
    const handleRoleChangeApproving = (0, express_async_handler_1.default)(async (req, res, next) => {
        const applicationId = req.params.applicationId;
        console.log(applicationId);
        const data = await (0, approveApplication_1.default)(applicationId, dbRepository, userReposiory);
        res.status(httpStatus_1.HttpStatus.OK).json({
            status: "success",
            message: "User has been approved to become Business user",
            data: data,
        });
    });
    return {
        createRoleChangeApplication,
        handlefetchAllApplications,
        handleRoleChangeApproving,
    };
}
exports.default = applicationController;
