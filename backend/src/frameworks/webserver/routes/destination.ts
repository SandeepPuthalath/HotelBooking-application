import express from "express";
import destinationController from "../../../adapters/destinationController/destinationController";
import destinationRespository from "../../../application/repositories/destinationRepository";
import destinationRespositoryDb from "../../database/mongoDB/repositories/destinationRespositoryDb";
import adminJwtTokenVerification from "../middlewares/adminJwtTokenVerificationts";

export default function destinationRouter() {
  const router = express.Router();
  const controller = destinationController(
    destinationRespository,
    destinationRespositoryDb
  );

  router
    .route("/")
    .get(controller.handleFetchAllDestinations)
    .post(adminJwtTokenVerification, controller.handleAddDestination);

  router.get("/featured", controller.handleFetchFeatured);

  return router;
}
