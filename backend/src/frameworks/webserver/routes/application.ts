import express from 'express';
import applicationController from '../../../adapters/applicationController/applicationConroller';
import applicationRepository from '../../../application/repositories/applicationRepository';
import applicationRepositoryDb from '../../database/mongoDB/repositories/applicationRespositoryDb';





const applicationRoute = () =>{
    
    const router = express.Router()


    const controller = applicationController(
        applicationRepository,
        applicationRepositoryDb
    )


    router.post('/role-change-application', controller.createRoleChangeApplication)

    return router
}



export default applicationRoute