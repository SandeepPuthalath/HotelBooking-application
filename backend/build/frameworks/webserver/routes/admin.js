"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/adminController/adminController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const BookingRepository_1 = __importDefault(require("../../../application/repositories/BookingRepository"));
const BookingRepositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/BookingRepositoryDb"));
const hotelRepository_1 = __importDefault(require("../../../application/repositories/hotelRepository"));
const hotelRespositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/hotelRespositoryDb"));
function adminRoute() {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB, BookingRepository_1.default, BookingRepositoryDb_1.default, hotelRepository_1.default, hotelRespositoryDb_1.default);
    router.route("/").get(controller.handleFetchingDashboardDatas);
    router.route("/users").get(controller.handleGetAllUsers);
    router.get("/user/:userId", controller.handleGetUserDetails);
    return router;
}
exports.default = adminRoute;
