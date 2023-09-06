"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const adminAuth_1 = require("../../application/user-cases/auth/adminAuth");
const httpStatus_1 = require("../../types/httpStatus");
function adminAuthController(authServiceInterface, authServiceImpl) {
    const services = authServiceInterface(authServiceImpl());
    const handleAdminLogin = async (req, res, next) => {
        const { email, password } = req.body;
        const token = await (0, adminAuth_1.adminLogin)(email, password, services, config_1.default);
        res.status(httpStatus_1.HttpStatus.OK).json({ status: 'success', message: 'Admin has been logged in succesfull', data: { access: token, refresh: "" } });
    };
    return {
        handleAdminLogin
    };
}
exports.default = adminAuthController;
