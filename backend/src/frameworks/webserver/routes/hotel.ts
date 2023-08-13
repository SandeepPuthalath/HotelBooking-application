import express from "express"
import hotelController from "../../../adapters/hotelController.ts/hotelController"
import hotelRepository from "../../../application/repositories/hotelRepository"
import hotelRepositoryDb from "../../database/mongoDB/repositories/hotelRespositoryDb"
import jwtTokenVerification from "../middlewares/jwtTokenVerification"


export default function hotelRouter(){

    const router = express.Router();
    const controller = hotelController(hotelRepository, hotelRepositoryDb);
    router.get('/', controller.handleViewAllHotels);
    router.get("/:id", controller.handleViewHotel);
    router.post('/create/:userId', jwtTokenVerification, controller.handleAddHotel);
    router.put('/update/:id', controller.handleUpdateHotel);
    router.delete('/delete/:id', controller.handleDeleteHotel);
    router.get('/myhotel/:userId',jwtTokenVerification, controller.handleGetMyHotelDetails);
    router.get('/search/:destination', controller.handleDestinationSearch);


    return router
}