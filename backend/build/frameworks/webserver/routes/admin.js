"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/adminController/adminController"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
function adminRoute() {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    router.route("/users").get(controller.handleGetAllUsers);
    router.get("/user/:userId", controller.handleGetUserDetails);
    return router;
}
exports.default = adminRoute;
