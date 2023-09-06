"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../../utils/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authServiceMiddleware = (0, authServiceInterface_1.authServiceInterface)((0, authService_1.authService)());
async function jwtTokenVerification(req, res, next) {
    let token = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        throw new appError_1.default('Token not found', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    try {
        const { payload } = authServiceMiddleware.verifyToken(token);
        next();
    }
    catch (err) {
        throw new appError_1.default('UnAuthorized User', httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.default = jwtTokenVerification;
;
