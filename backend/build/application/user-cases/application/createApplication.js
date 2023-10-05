"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = __importDefault(require("../../../entities/application"));
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
function createApplication(applicantId, name, GSTNumber, applicationRepository) {
    if (!applicantId || !GSTNumber) {
        throw new appError_1.default('pleace provide a valid informations', httpStatus_1.HttpStatus.NOT_FOUND);
    }
    const newApplication = (0, application_1.default)(applicantId, name, GSTNumber);
    return applicationRepository.create(newApplication);
}
exports.default = createApplication;
