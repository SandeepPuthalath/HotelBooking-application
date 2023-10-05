"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = __importDefault(require("../../../adapters/roomController/roomController"));
const roomRepository_1 = __importDefault(require("../../../application/repositories/roomRepository"));
const roomsRepositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/roomsRepositoryDb"));
const hotelRepository_1 = __importDefault(require("../../../application/repositories/hotelRepository"));
const hotelRespositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/hotelRespositoryDb"));
function roomRouter() {
    const router = express_1.default.Router();
    const controller = (0, roomController_1.default)(roomRepository_1.default, roomsRepositoryDb_1.default, hotelRepository_1.default, hotelRespositoryDb_1.default);
    router.post("/:hotelId", controller.handleAddRoom);
    router.get("/:hotelId", controller.handleGetAllRooms);
    router.route("/:id").put(controller.handleUpdateRoomDetails);
    router.get("/details/:hotelId/:roomId", controller.handleGetRoomDetails);
    router.post("/add/img/:hotelId/:roomId", controller.handleAddRoomImage);
    router.post("/", controller.handleSearchRoom);
    return router;
}
exports.default = roomRouter;
