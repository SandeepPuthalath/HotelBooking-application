import express from "express";
import applicationController from "../../../adapters/applicationController/applicationConroller";
import applicationRepository from "../../../application/repositories/applicationRepository";
import applicationRepositoryDb from "../../database/mongoDB/repositories/applicationRespositoryDb";
import jwtTokenVerification from "../middlewares/jwtTokenVerification";
import adminJwtTokenVerification from "../middlewares/adminJwtTokenVerificationts";
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userRepositoryMongoDB } from "../../database/mongoDB/repositories/userRepositoryMongoDB";

const applicationRoute = () => {
  const router = express.Router();

  const controller = applicationController(
    applicationRepository,
    applicationRepositoryDb,
    userDbRepository,
    userRepositoryMongoDB
  );

  router.post(
    "/role-change-application",
    jwtTokenVerification,
    controller.createRoleChangeApplication
  );

  router.post(
    "/approve/:applicationId",
    adminJwtTokenVerification,
    controller.handleRoleChangeApproving
  );

  router
    .route("/")
    .get(
      adminJwtTokenVerification, 
      controller.handlefetchAllApplications)

  return router;
};

export default applicationRoute;
