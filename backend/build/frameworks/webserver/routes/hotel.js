"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = __importDefault(require("../../../adapters/hotelController.ts/hotelController"));
const hotelRepository_1 = __importDefault(require("../../../application/repositories/hotelRepository"));
const hotelRespositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/hotelRespositoryDb"));
const jwtTokenVerification_1 = __importDefault(require("../middlewares/jwtTokenVerification"));
function hotelRouter() {
    const router = express_1.default.Router();
    const controller = (0, hotelController_1.default)(hotelRepository_1.default, hotelRespositoryDb_1.default);
    router.get("/", controller.handleViewAllHotels);
    router.get("/featured", controller.handleGetFeatureHotels);
    router.get("/:id", controller.handleViewHotel);
    router.post("/create/:userId", jwtTokenVerification_1.default, controller.handleAddHotel);
    router.put("/update/:id", controller.handleUpdateHotel);
    router.delete("/delete/:id", controller.handleDeleteHotel);
    router.get("/myhotel/:userId", jwtTokenVerification_1.default, controller.handleGetMyHotelDetails);
    router.get("/search/:destination", controller.handleDestinationSearch);
    router.put("/rating", jwtTokenVerification_1.default, controller.handleRating);
    return router;
}
exports.default = hotelRouter;
