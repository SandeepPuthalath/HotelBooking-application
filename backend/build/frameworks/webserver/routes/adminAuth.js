"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../adapters/adminAuthController/adminAuthController"));
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authService_1 = require("../../services/authService");
function adminAuthRoute() {
    const router = express_1.default.Router();
    const controller = (0, adminAuthController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService);
    router.post('/login', controller.handleAdminLogin);
    return router;
}
exports.default = adminAuthRoute;
