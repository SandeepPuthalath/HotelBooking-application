"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
async function approveApplication(applicationId, applicationRepo, userRepo) {
    if (!applicationId) {
        throw new appError_1.default("Bad Request", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const applicantion = await applicationRepo.fetchApplication(applicationId);
    const { applicantId, GSTNumber } = applicantion;
    const data = await userRepo.changeUserRole(applicantId, GSTNumber);
    if (!data) {
        throw new appError_1.default("Somthing went wrong", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    await applicationRepo.changeStatus(applicationId);
    return data;
}
exports.default = approveApplication;
