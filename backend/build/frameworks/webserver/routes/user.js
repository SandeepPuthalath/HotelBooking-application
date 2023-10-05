"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userDbRepository_1 = require("../../../application/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDB/repositories/userRepositoryMongoDB");
const userController_1 = __importDefault(require("../../../adapters/userController/userController"));
const userRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.userRepositoryMongoDB);
    router;
    router.put('/profile/update/:userId', controller.handleUpdateUserProfile);
    // router.patch('/profile/changeRole/:userId', controller.HandleChangeUserRole);
    router
        .route("/profile/:userId")
        .get(controller.handleGetUserProfile)
        .patch(controller.handleUpdateProfileImage);
    return router;
};
exports.default = userRouter;
