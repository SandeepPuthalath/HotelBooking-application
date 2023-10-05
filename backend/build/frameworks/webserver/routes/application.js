"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationConroller_1 = __importDefault(require("../../../adapters/applicationController/applicationConroller"));
const applicationRepository_1 = __importDefault(require("../../../application/repositories/applicationRepository"));
const applicationRespositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/applicationRespositoryDb"));
const jwtTokenVerification_1 = __importDefault(require("../middlewares/jwtTokenVerification"));
const adminJwtTokenVerificationts_1 = __importDefault(require("../middlewares/adminJwtTokenVerificationts"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const applicationRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, applicationConroller_1.default)(applicationRepository_1.default, applicationRespositoryDb_1.default, userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    router.post("/role-change-application", jwtTokenVerification_1.default, controller.createRoleChangeApplication);
    router.post("/approve/:applicationId", adminJwtTokenVerificationts_1.default, controller.handleRoleChangeApproving);
    router
        .route("/")
        .get(adminJwtTokenVerificationts_1.default, controller.handlefetchAllApplications);
    return router;
};
exports.default = applicationRoute;
