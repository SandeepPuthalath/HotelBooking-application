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

    router.get('/profile/:userId', controller.handleGetUserProfile);
    router.put('/profile/update/:userId', controller.handleUpdateUserProfile);
    router.patch('/profile/changeRole/:userId', controller.HandleChangeUserRole);
   

    return router
}

export default userRouter