import express from 'express';
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { userRepositoryMongoDB } from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import userController from '../../../adapters/userController/userController';


const userRouter = () =>{

    const router = express.Router();


    const controller = userController(
        userDbRepository,
        userRepositoryMongoDB
    )

    router;
    router.put('/profile/update/:userId', controller.handleUpdateUserProfile);
    // router.patch('/profile/changeRole/:userId', controller.HandleChangeUserRole);
    router
      .route("/profile/:userId")
      .get(controller.handleGetUserProfile)
      .patch(controller.handleUpdateProfileImage);
   

    return router
}

export default userRouter