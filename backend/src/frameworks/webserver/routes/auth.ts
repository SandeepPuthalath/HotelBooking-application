import express from 'express';
import authController from '../../../adapters/authController/authController';
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import { authService } from '../../services/authService';


const authRouter = () => {
  const router = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongoDB,
  );

  router.post('/signup', controller.registerUser);

  router.post('/login', controller.loginUser);

  router.post('/send-otp', controller.sendOtp);

  router.post('/verify-otp', controller.verifyOtp)

  return router;
};

export default authRouter;
