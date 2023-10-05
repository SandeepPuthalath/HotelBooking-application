"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const destinationController_1 = __importDefault(require("../../../adapters/destinationController/destinationController"));
const destinationRepository_1 = __importDefault(require("../../../application/repositories/destinationRepository"));
const destinationRespositoryDb_1 = __importDefault(require("../../database/mongoDB/repositories/destinationRespositoryDb"));
const adminJwtTokenVerificationts_1 = __importDefault(require("../middlewares/adminJwtTokenVerificationts"));
function destinationRouter() {
    const router = express_1.default.Router();
    const controller = (0, destinationController_1.default)(destinationRepository_1.default, destinationRespositoryDb_1.default);
    router
        .route("/")
        .get(controller.handleFetchAllDestinations)
        .post(adminJwtTokenVerificationts_1.default, controller.handleAddDestination);
    router.get("/featured", controller.handleFetchFeatured);
    return router;
}
exports.default = destinationRouter;
