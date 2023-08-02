import express from "express";
import adminAuthController from "../../../adapters/adminAuthController/adminAuthController";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authService } from "../../services/authService";

export default function adminAuthRoute() {
  const router = express.Router();

  const controller = adminAuthController(authServiceInterface, authService);

  router.post('/login', controller.handleAdminLogin)

  return router;
}
