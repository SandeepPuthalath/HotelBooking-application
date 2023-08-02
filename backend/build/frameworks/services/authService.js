"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authService = () => {
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        password = await bcryptjs_1.default.hash(password, salt);
        return password;
    };
    const comparePassword = (password, hashedPassword) => {
        return bcryptjs_1.default.compare(password, hashedPassword);
    };
    const generateToken = (payload) => {
        const token = jsonwebtoken_1.default.sign({ payload }, config_1.default.JWT_SECRET, {
            expiresIn: '5d',
        });
        return token;
    };
    const verifyToken = (token) => {
        console.log(token, 'tokkkkkkkkk');
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
    };
};
exports.authService = authService;
