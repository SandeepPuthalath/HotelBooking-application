"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const twilio_1 = __importDefault(require("../../utils/twilio"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const twilio = new twilio_1.default(config_1.default.TWILIO_ACCOUNT_SID, config_1.default.TWILIO_AUTH_TOKEN, config_1.default.TWILIO_SERVICE_SID);
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
            expiresIn: "5d",
        });
        return token;
    };
    const verifyToken = (token) => {
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    const generateOTP = async (phoneNumber) => {
        const otpStatus = await twilio
            .sendVerificationCode(phoneNumber)
            .then((verfication) => verfication?.status)
            .catch((error) => console.log(error));
        return otpStatus;
    };
    const verifyOTP = async (phoneNumber, otp) => {
        const verfication = await twilio
            .verifyCode(phoneNumber, otp)
            .then((verificationCheck) => verificationCheck?.status)
            .catch((error) => console.log(error));
        return verfication;
    };
    const verifyAdmin = (token) => {
        const decode = (0, jwt_decode_1.default)(token);
        const result = JSON.parse(decode?.payload);
        if (!result?.admin) {
            return false;
        }
        return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    };
    return {
        encryptPassword,
        comparePassword,
        generateToken,
        verifyToken,
        generateOTP,
        verifyOTP,
        verifyAdmin,
    };
};
exports.authService = authService;
